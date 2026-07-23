"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { ArrowLeft, Heart, MessageCircle, ThumbsUp, Star, Flame, Plus, Search, X, Trash2, EyeOff } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { useUser } from "@/lib/user-context"
import { useMasterAccess } from "@/lib/use-master-access"
import { usePoints } from "@/lib/points-context"
import { APP_ROUTES } from "@/lib/app-routes"
import {
  normalizeAuthorKey,
  resolveAuthorDisplayMeta,
  type AuthorDisplayMeta,
} from "@/lib/community-author-display"
import { getLevelTitleKo } from "@/lib/level-system"
import { fetchAuthorDisplayMetaByNicknames, invalidateAuthorMetaForNickname } from "@/lib/supabase-profile-level-titles"
import { CommunityAuthorMeta } from "@/components/community-author-meta"
import type { CommunityCategoryKey } from "@/lib/community-sample-posts"
import {
  deleteCommunityComment,
  fetchCommunityCommentsByPostId,
  hideCommunityComment,
  incrementPostCommentsCount,
  decrementPostCommentsCount,
  insertCommunityComment,
  mapCommentRowToView,
  type CommunityCommentView,
} from "@/lib/supabase-community-comments"
import {
  fetchLikedPostIdsForUser,
  likeCommunityPost,
} from "@/lib/supabase-community-likes"
import {
  COMMUNITY_POSTS_PAGE_SIZE,
  deleteCommunityPost,
  fetchCommunityPosts,
  fetchRecommendedCommunityPosts,
  formatCommunityPostDate,
  hideCommunityPost,
  insertCommunityPost,
  normalizeCategoryKey,
  type CommunityPostRow,
} from "@/lib/supabase-community-posts"

const PAGE_SIZE = 10

type Post = {
  id: string
  title: string
  author: string
  date: string
  createdAt: string
  likes: number
  comments: number
  categoryKey: CommunityCategoryKey
  preview: string
  content: string
  isRecommended?: boolean
  isHidden?: boolean
}

type SearchField = "title" | "author"

function isAuthorMatch(author: string, nickname: string | undefined): boolean {
  const nick = nickname?.trim()
  if (!nick) return false
  return author.trim() === nick
}

function mapRowToPost(row: CommunityPostRow): Post {
  const categoryKey = normalizeCategoryKey(row.category)
  const content = row.content ?? ""
  const likes = Number(row.likes) || 0
  const comments = Number(row.comments_count) || 0
  return {
    id: row.id,
    title: row.title,
    author: row.author,
    date: formatCommunityPostDate(row.created_at),
    createdAt: row.created_at,
    likes,
    comments,
    categoryKey,
    content,
    preview: content.length > 100 ? `${content.substring(0, 100)}...` : content,
    isRecommended: likes >= 80,
    isHidden: row.is_hidden,
  }
}

function canDeletePost(
  post: Post,
  linkedNickname: string | null,
  isMaster: boolean
): boolean {
  if (isMaster) return true
  if (!linkedNickname) return false
  return isAuthorMatch(post.author, linkedNickname)
}

function canDeleteComment(
  comment: CommunityCommentView,
  linkedNickname: string | null,
  isMaster: boolean
): boolean {
  if (isMaster) return true
  if (!linkedNickname) return false
  return isAuthorMatch(comment.author, linkedNickname)
}

function PostCard({
  post,
  authorMeta,
  onLike,
  onSelect,
  isUserLiked,
  t,
}: {
  post: Post
  authorMeta: AuthorDisplayMeta
  onLike: (id: string) => void
  onSelect: (post: Post) => void
  isUserLiked: boolean
  t: (k: string) => string
}) {
  return (
    <div onClick={() => onSelect(post)} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <CommunityAuthorMeta
            author={post.author}
            date={post.date}
            meta={authorMeta}
            className="mb-1.5"
            trailing={
              <>
                {post.isHidden && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">
                    {t('community.hiddenBadge')}
                  </span>
                )}
                {post.isRecommended && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 flex items-center gap-1">
                    <Star className="h-2.5 w-2.5" />
                    {t('community.recommendedBadge')}
                  </span>
                )}
              </>
            }
          />
          <h3 className="font-bold text-gray-800 text-sm leading-snug line-clamp-2">{post.title}</h3>
        </div>
      </div>
      <p className="text-gray-500 text-xs line-clamp-2 mb-3">{post.preview}</p>
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onLike(post.id)
            }}
            className={`flex items-center gap-1 transition-all active:scale-95 ${
              isUserLiked 
                ? 'text-rose-600' 
                : 'text-rose-400 hover:text-rose-600'
            }`}
          >
            <Heart className={`h-3.5 w-3.5 ${isUserLiked ? 'fill-current' : ''}`} />
            <span className="text-xs font-medium">{post.likes}</span>
          </button>
          <div className="flex items-center gap-1 text-blue-400">
            <MessageCircle className="h-3.5 w-3.5" />
            <span className="text-xs">{post.comments}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function getPostAuthorName(nickname: string | undefined, anonymousLabel: string): string {
  const trimmed = nickname?.trim()
  return trimmed ? trimmed : anonymousLabel
}

export default function CommunityPage() {
  const { t } = useLanguage()
  const { user } = useUser()
  const { isMaster, isLoading: masterLoading, linkedNickname } = useMasterAccess()
  const [mutateNotice, setMutateNotice] = useState<string | null>(null)
  const { points } = usePoints()
  const postAuthor = getPostAuthorName(user?.nickname, t("community.anonymous"))
  const currentNickname = user?.nickname?.trim() ?? ""
  const currentUserCode = user?.referralCode?.trim().toUpperCase() ?? ""
  const [posts, setPosts] = useState<Post[]>([])
  const [postsLoading, setPostsLoading] = useState(true)
  const [serverHasMore, setServerHasMore] = useState(true)
  const [likedPostIds, setLikedPostIds] = useState<Set<string>>(new Set())
  const [activeTab, setActiveTab] = useState<'latest' | 'recommended'>('latest')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchField, setSearchField] = useState<SearchField>("title")
  const [likeNotice, setLikeNotice] = useState<string | null>(null)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showWriteModal, setShowWriteModal] = useState(false)
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
  const [newPostCategory, setNewPostCategory] = useState<CommunityCategoryKey>('other')
  const [isSubmittingPost, setIsSubmittingPost] = useState(false)
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState<CommunityCommentView[]>([])
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [authorMetaMap, setAuthorMetaMap] = useState<Record<string, AuthorDisplayMeta>>({})
  const loaderRef = useRef<HTMLDivElement>(null)
  /** Sync guard: React state alone cannot block rapid double-clicks before re-render. */
  const isSubmittingPostRef = useRef(false)
  const isSubmittingCommentRef = useRef(false)
  const postsOffsetRef = useRef(0)
  const lastPostsFetchAtRef = useRef(0)
  const softRefreshRef = useRef(false)
  const postsLoadingMoreRef = useRef(false)
  const serverHasMoreRef = useRef(true)
  const recommendedLoadedRef = useRef(false)
  const authorMetaKeysRef = useRef<Set<string>>(new Set())
  const POSTS_REFETCH_COOLDOWN_MS = 60_000

  const defaultLevelTitle = getLevelTitleKo(6)

  const getAuthorMeta = useCallback(
    (author: string): AuthorDisplayMeta => {
      const key = normalizeAuthorKey(author)
      return (
        authorMetaMap[key] ??
        resolveAuthorDisplayMeta(author, undefined, defaultLevelTitle)
      )
    },
    [authorMetaMap, defaultLevelTitle]
  )

  const refreshAuthorMeta = useCallback(
    async (authors: string[], opts?: { forceKeys?: string[] }) => {
      const unique = [...new Set(authors.map((a) => a.trim()).filter(Boolean))]
      if (unique.length === 0) return

      const force = new Set((opts?.forceKeys ?? []).map(normalizeAuthorKey))
      const missing = unique.filter((a) => {
        const key = normalizeAuthorKey(a)
        if (force.has(key)) return true
        return !authorMetaKeysRef.current.has(key)
      })
      if (missing.length === 0) return

      for (const a of missing) {
        authorMetaKeysRef.current.add(normalizeAuthorKey(a))
      }

      const map = await fetchAuthorDisplayMetaByNicknames(missing, defaultLevelTitle)
      setAuthorMetaMap((prev) => ({ ...prev, ...map }))
    },
    [defaultLevelTitle]
  )

  const loadPostsFromSupabase = useCallback(
    async (mode: "replace" | "append" = "replace") => {
      if (mode === "replace") {
        if (!softRefreshRef.current) setPostsLoading(true)
        postsOffsetRef.current = 0
        setServerHasMore(true)
      } else if (postsLoadingMoreRef.current || !serverHasMoreRef.current) {
        return
      }

      if (mode === "append") postsLoadingMoreRef.current = true

      try {
        const offset = mode === "replace" ? 0 : postsOffsetRef.current
        const rows = await fetchCommunityPosts({
          includeHidden: isMaster,
          limit: COMMUNITY_POSTS_PAGE_SIZE,
          offset,
        })
        const seen = new Set<string>()
        const mapped = rows
          .map(mapRowToPost)
          .filter((p) => {
            if (seen.has(p.id)) return false
            seen.add(p.id)
            return true
          })

        setServerHasMore(rows.length >= COMMUNITY_POSTS_PAGE_SIZE)
        serverHasMoreRef.current = rows.length >= COMMUNITY_POSTS_PAGE_SIZE
        postsOffsetRef.current = offset + rows.length

        if (mode === "append") {
          setPosts((prev) => {
            const ids = new Set(prev.map((p) => p.id))
            return [...prev, ...mapped.filter((p) => !ids.has(p.id))]
          })
        } else {
          setPosts(mapped)
          lastPostsFetchAtRef.current = Date.now()
        }
      } catch {
        if (mode === "replace") setPosts([])
      } finally {
        if (mode === "replace") setPostsLoading(false)
        softRefreshRef.current = false
        postsLoadingMoreRef.current = false
      }
    },
    [isMaster]
  )

  const loadRecommendedIfNeeded = useCallback(async () => {
    if (recommendedLoadedRef.current) return
    recommendedLoadedRef.current = true
    try {
      const rows = await fetchRecommendedCommunityPosts({
        includeHidden: isMaster,
        limit: COMMUNITY_POSTS_PAGE_SIZE,
      })
      const mapped = rows.map(mapRowToPost)
      setPosts((prev) => {
        const ids = new Set(prev.map((p) => p.id))
        const extras = mapped.filter((p) => !ids.has(p.id))
        return extras.length === 0 ? prev : [...prev, ...extras]
      })
    } catch {
      recommendedLoadedRef.current = false
    }
  }, [isMaster])

  // Wait for master hydration so we do not fetch twice (anon then master)
  useEffect(() => {
    if (masterLoading) return
    recommendedLoadedRef.current = false
    void loadPostsFromSupabase("replace")
  }, [loadPostsFromSupabase, masterLoading])

  // Single author-meta effect — only fetch missing nicknames
  useEffect(() => {
    const authors = [
      ...posts.map((p) => p.author),
      ...comments.map((c) => c.author),
    ]
    if (currentNickname) authors.push(currentNickname)
    if (authors.length === 0) return
    void refreshAuthorMeta(authors)
  }, [posts, comments, currentNickname, refreshAuthorMeta])

  // Points change: refresh ONLY current user's author meta (skip initial mount)
  const skipInitialPointsMetaRef = useRef(true)
  useEffect(() => {
    if (!currentNickname) return
    if (skipInitialPointsMetaRef.current) {
      skipInitialPointsMetaRef.current = false
      return
    }
    const key = normalizeAuthorKey(currentNickname)
    authorMetaKeysRef.current.delete(key)
    invalidateAuthorMetaForNickname(currentNickname)
    void refreshAuthorMeta([currentNickname], { forceKeys: [currentNickname] })
  }, [points, currentNickname, refreshAuthorMeta])

  // Tab focus: cooldown soft refresh (stable listener — no duplicate registrations)
  const loadPostsRef = useRef(loadPostsFromSupabase)
  loadPostsRef.current = loadPostsFromSupabase

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState !== "visible") return
      const now = Date.now()
      if (now - lastPostsFetchAtRef.current < POSTS_REFETCH_COOLDOWN_MS) return
      softRefreshRef.current = true
      void loadPostsRef.current("replace")
    }
    document.addEventListener("visibilitychange", onVisible)
    return () => document.removeEventListener("visibilitychange", onVisible)
  }, [])

  useEffect(() => {
    if (activeTab === "recommended") {
      void loadRecommendedIfNeeded()
    }
  }, [activeTab, loadRecommendedIfNeeded])

  const loadLikedPostIds = useCallback(async () => {
    if (!currentNickname && !currentUserCode) {
      setLikedPostIds(new Set())
      return
    }
    try {
      const ids = await fetchLikedPostIdsForUser({
        user_code: currentUserCode,
        nickname: currentNickname || postAuthor,
      })
      setLikedPostIds(new Set(ids))
    } catch {
      setLikedPostIds(new Set())
    }
  }, [currentNickname, currentUserCode, postAuthor])

  useEffect(() => {
    void loadLikedPostIds()
  }, [loadLikedPostIds])

  const loadCommentsForPost = useCallback(
    async (postId: string) => {
      try {
        const rows = await fetchCommunityCommentsByPostId(postId, {
          includeHidden: isMaster,
        })
        setComments(rows.map(mapCommentRowToView))
      } catch {
        setComments([])
      }
    },
    [isMaster]
  )

  useEffect(() => {
    if (!selectedPost) {
      setComments([])
      return
    }
    void loadCommentsForPost(selectedPost.id)
  }, [selectedPost?.id, loadCommentsForPost, isMaster])

  const updatePostLikesInState = (postId: string, likes: number) => {
    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, likes } : p)))
    setSelectedPost((prev) => (prev?.id === postId ? { ...prev, likes } : prev))
  }

  const handleLike = async (id: string) => {
    if (!currentNickname && !currentUserCode) return

    const post = posts.find((p) => p.id === id)

    try {
      const result = await likeCommunityPost(id, {
        user_code: currentUserCode,
        nickname: currentNickname || postAuthor,
      })

      if (result.status === "already_liked") {
        setLikeNotice(t("community.alreadyLiked"))
        return
      }

      if (result.status === "failed") return

      setLikedPostIds((prev) => new Set([...prev, id]))
      const likes =
        result.likes != null
          ? result.likes
          : post
            ? post.likes + 1
            : undefined
      if (likes != null) {
        updatePostLikesInState(id, likes)
      }
      setLikeNotice(null)
    } catch (err) {
      console.error("[community] like error", err)
    }
  }

  const isPostLikedByUser = (postId: string) => likedPostIds.has(postId)

  const handleDeletePost = async () => {
    if (!selectedPost || masterLoading) return
    if (!canDeletePost(selectedPost, linkedNickname, isMaster)) return

    try {
      // Likes/comments cascade is handled server-side in post-mutate (service role).
      const result = await deleteCommunityPost(selectedPost.id)
      if (!result.ok) {
        console.error('[community] delete post failed', result)
        setMutateNotice(result.message)
        return
      }
      console.log('[community] delete post success', { postId: selectedPost.id })
      setMutateNotice(null)

      setPosts((prev) => prev.filter((p) => p.id !== selectedPost.id))
      setLikedPostIds((prev) => {
        const next = new Set(prev)
        next.delete(selectedPost.id)
        return next
      })
      setSelectedPost(null)
      setComments([])
      setCommentText("")
    } catch (err) {
      console.error("[community] delete post error", err)
      setMutateNotice('삭제 중 오류가 발생했습니다.')
    }
  }

  const handleHidePost = async () => {
    if (!selectedPost || masterLoading || !isMaster) return

    try {
      const result = await hideCommunityPost(
        selectedPost.id,
        linkedNickname || currentNickname
      )
      if (!result.ok) {
        console.error('[community] hide post failed', result)
        setMutateNotice(result.message)
        return
      }
      console.log('[community] hide post success', { postId: selectedPost.id })
      setMutateNotice(null)

      setPosts((prev) => prev.filter((p) => p.id !== selectedPost.id))
      setSelectedPost(null)
      setComments([])
      setCommentText("")
    } catch (err) {
      console.error('[community] hide post error', err)
      setMutateNotice('숨김 처리 중 오류가 발생했습니다.')
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    if (!selectedPost || masterLoading) return
    const target = comments.find((c) => c.id === commentId)
    if (!target || !canDeleteComment(target, linkedNickname, isMaster)) return

    try {
      const result = await deleteCommunityComment(commentId)
      if (!result.ok) {
        console.error('[community] delete comment failed', result)
        setMutateNotice(result.message)
        return
      }
      console.log('[community] delete comment success', { commentId })
      setMutateNotice(null)

      await decrementPostCommentsCount(selectedPost.id)
      setComments((prev) => prev.filter((c) => c.id !== commentId))
      setPosts((prev) =>
        prev.map((p) =>
          p.id === selectedPost.id ? { ...p, comments: Math.max(0, p.comments - 1) } : p
        )
      )
      setSelectedPost((prev) =>
        prev ? { ...prev, comments: Math.max(0, prev.comments - 1) } : null
      )
    } catch (err) {
      console.error("[community] delete comment error", err)
      setMutateNotice('댓글 삭제 중 오류가 발생했습니다.')
    }
  }

  const handleHideComment = async (commentId: string) => {
    if (!selectedPost || masterLoading || !isMaster) return
    const target = comments.find((c) => c.id === commentId)
    if (!target) return

    try {
      const result = await hideCommunityComment(
        commentId,
        linkedNickname || currentNickname
      )
      if (!result.ok) {
        console.error('[community] hide comment failed', result)
        setMutateNotice(result.message)
        return
      }
      console.log('[community] hide comment success', { commentId })
      setMutateNotice(null)

      setComments((prev) => prev.filter((c) => c.id !== commentId))
    } catch (err) {
      console.error('[community] hide comment error', err)
      setMutateNotice('댓글 숨김 중 오류가 발생했습니다.')
    }
  }

  const matchesSearch = (post: Post) => {
    const q = searchQuery.trim()
    if (!q) return true
    if (searchField === "title") return post.title.includes(q)
    return post.author.includes(q)
  }

  const handleWritePost = async () => {
    if (isSubmittingPostRef.current) return

    const title = newPostTitle.trim()
    const content = newPostContent.trim()
    if (!title || !content) return

    isSubmittingPostRef.current = true
    setIsSubmittingPost(true)

    try {
      const inserted = await insertCommunityPost({
        title,
        content,
        category: newPostCategory,
        author: postAuthor,
      })

      if (inserted) {
        const mapped = mapRowToPost(inserted)
        setPosts((prev) =>
          prev.some((p) => p.id === mapped.id) ? prev : [mapped, ...prev]
        )
      } else {
        await loadPostsFromSupabase("replace")
      }

      await refreshAuthorMeta([postAuthor, ...posts.map((p) => p.author)])

      setNewPostTitle('')
      setNewPostContent('')
      setNewPostCategory('other')
      setShowWriteModal(false)
    } finally {
      isSubmittingPostRef.current = false
      setIsSubmittingPost(false)
    }
  }

  const handleAddComment = async () => {
    if (isSubmittingCommentRef.current) return

    const text = commentText.trim()
    if (!text || !selectedPost) return

    isSubmittingCommentRef.current = true
    setIsSubmittingComment(true)

    try {
      const inserted = await insertCommunityComment({
        post_id: selectedPost.id,
        author: postAuthor,
        content: text,
      })

      if (!inserted) return

      await incrementPostCommentsCount(selectedPost.id)

      const mapped = mapCommentRowToView(inserted)
      setComments((prev) =>
        prev.some((c) => c.id === mapped.id) ? prev : [...prev, mapped]
      )
      setCommentText('')
      setPosts((prev) =>
        prev.map((p) => (p.id === selectedPost.id ? { ...p, comments: p.comments + 1 } : p))
      )
      setSelectedPost((prev) => (prev ? { ...prev, comments: prev.comments + 1 } : null))

      await refreshAuthorMeta([
        postAuthor,
        inserted.author,
        ...comments.map((c) => c.author),
        selectedPost.author,
      ])
    } finally {
      isSubmittingCommentRef.current = false
      setIsSubmittingComment(false)
    }
  }

  const latestPosts = posts
    .filter(matchesSearch)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const recommendedPosts = posts
    .filter((p) => p.isRecommended && matchesSearch(p))
    .sort((a, b) => b.likes - a.likes)

  const allDisplayPosts = activeTab === 'latest' ? latestPosts : recommendedPosts
  const displayPosts = allDisplayPosts.slice(0, visibleCount)
  const hasMoreLocal = visibleCount < allDisplayPosts.length
  const hasMore = hasMoreLocal || (activeTab === 'latest' && serverHasMore)

  // 탭이나 검색어 변경 시 visibleCount 초기화
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [activeTab, searchQuery, searchField])

  // IntersectionObserver로 스크롤 시 자동 추가 로드 (+ server pagination)
  useEffect(() => {
    const node = loaderRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        if (hasMoreLocal) {
          setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, allDisplayPosts.length))
          return
        }
        if (activeTab === 'latest' && serverHasMore) {
          void loadPostsFromSupabase('append')
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(node)

    return () => {
      observer.unobserve(node)
      observer.disconnect()
    }
  }, [hasMoreLocal, allDisplayPosts.length, activeTab, serverHasMore, loadPostsFromSupabase])

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* 헤더 */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10 shadow-sm">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={APP_ROUTES.home} prefetch={false} translate="no" className="notranslate">
              <ArrowLeft className="h-6 w-6 text-gray-700" />
            </Link>
            <h1 className="text-lg font-bold text-gray-800">{t('community.title')}</h1>
          </div>
          <Button size="sm" onClick={() => setShowWriteModal(true)} className="bg-purple-600 hover:bg-purple-700 text-white text-xs gap-1">
            <Plus className="h-3.5 w-3.5" />
            {t('community.writePost')}
          </Button>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-4 space-y-4">
        {/* 안내 */}
        <p className="text-xs text-gray-500 px-1 leading-relaxed">
          {t("community.guidelineWarning")}
        </p>

        {/* 검색 */}
        <div className="flex gap-2 items-stretch">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder={t("community.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <select
            value={searchField}
            onChange={(e) => setSearchField(e.target.value as SearchField)}
            aria-label={t("community.search")}
            className="shrink-0 w-[5.5rem] sm:w-[6.5rem] px-2 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="title">{t("community.searchByTitle")}</option>
            <option value="author">{t("community.searchByAuthor")}</option>
          </select>
        </div>

        {likeNotice && (
          <p className="text-xs text-amber-600 px-1">{likeNotice}</p>
        )}

        {/* 탭 */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('latest')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'latest'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            <Flame className="h-3.5 w-3.5" />
            {t('community.latest')}
          </button>
          <button
            onClick={() => setActiveTab('recommended')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'recommended'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            <ThumbsUp className="h-3.5 w-3.5" />
            {t('community.recommended')}
          </button>
        </div>

        {/* 탭 소제목 */}
        {activeTab === 'recommended' && (
          <div className="flex items-center gap-2 text-amber-600 font-semibold text-sm px-1">
            <Star className="h-4 w-4" />
            {t('community.recommendedWithCount').replace('{count}', String(recommendedPosts.length))}
          </div>
        )}

        {/* 게시글 목록 */}
        <div className="space-y-3">
          {displayPosts.length > 0 ? (
            displayPosts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                authorMeta={getAuthorMeta(post.author)}
                onLike={(id) => void handleLike(id)}
                onSelect={setSelectedPost}
                isUserLiked={isPostLikedByUser(post.id)}
                t={t}
              />
            ))
          ) : !postsLoading ? (
            <div className="text-center py-12 text-gray-400">
              <MessageCircle className="h-10 w-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm">{t('community.empty')}</p>
            </div>
          ) : null}

          {/* 무한 스크롤 센티널 */}
          <div ref={loaderRef} className="h-6 flex items-center justify-center">
            {hasMore && (
              <div className="flex items-center gap-2 text-gray-400 text-xs py-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 글쓰기 모달 */}
      {showWriteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">{t('community.modalNewPost')}</h2>
              <button
                type="button"
                onClick={() => {
                  if (isSubmittingPost) return
                  setShowWriteModal(false)
                }}
                disabled={isSubmittingPost}
                className="text-gray-400 hover:text-gray-600 disabled:opacity-40"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">{t('community.labelTitle')}</label>
                <input
                  type="text"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder={t('community.placeholderTitle')}
                  disabled={isSubmittingPost}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-60"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">{t('community.labelContent')}</label>
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder={t('community.placeholderContent')}
                  rows={6}
                  disabled={isSubmittingPost}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none disabled:opacity-60"
                />
              </div>
              <Button
                type="button"
                onClick={() => void handleWritePost()}
                disabled={isSubmittingPost || !newPostTitle.trim() || !newPostContent.trim()}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold disabled:opacity-60 disabled:pointer-events-none"
              >
                {isSubmittingPost ? '...' : t('community.publish')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 게시글 상세 모달 */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between gap-2">
              <button onClick={() => { setSelectedPost(null); setComments([]); setCommentText(''); setMutateNotice(null); }} className="text-gray-400 hover:text-gray-600 shrink-0">
                <X className="h-6 w-6" />
              </button>
              <div className="flex items-center gap-2 shrink-0">
                {masterLoading && (
                  <span className="text-[10px] text-gray-400">권한 확인 중…</span>
                )}
                {!masterLoading && isMaster && (
                  <button
                    type="button"
                    onClick={() => void handleHidePost()}
                    className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700"
                  >
                    <EyeOff className="h-4 w-4" />
                    {t('community.hidePost')}
                  </button>
                )}
                {!masterLoading && canDeletePost(selectedPost, linkedNickname, isMaster) && (
                  <button
                    type="button"
                    onClick={() => void handleDeletePost()}
                    className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                    {t('community.deletePost')}
                  </button>
                )}
              </div>
            </div>
            {mutateNotice && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{mutateNotice}</p>
            )}
            <div>
              <CommunityAuthorMeta
                author={selectedPost.author}
                date={selectedPost.date}
                meta={getAuthorMeta(selectedPost.author)}
                className="mb-2"
                trailing={
                  selectedPost.isHidden ? (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">
                      {t('community.hiddenBadge')}
                    </span>
                  ) : null
                }
              />
              <h2 className="text-xl font-bold text-gray-800 mb-3">{selectedPost.title}</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">{selectedPost.content}</p>
              <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    void handleLike(selectedPost.id)
                  }}
                  className={`flex items-center gap-1 transition-all active:scale-95 font-medium ${
                    isPostLikedByUser(selectedPost.id)
                      ? 'text-rose-600'
                      : 'text-gray-600 hover:text-rose-600'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isPostLikedByUser(selectedPost.id) ? 'fill-current' : ''}`} />
                  {selectedPost.likes}
                </button>
                <span className="flex items-center gap-1"><MessageCircle className="h-4 w-4" />{selectedPost.comments}</span>
              </div>
            </div>

            {/* 댓글 입력 */}
            <div className="space-y-2 border-t pt-4">
              <label className="text-sm font-medium text-gray-700 block">{t('community.labelComment')}</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder={t('community.placeholderComment')}
                  disabled={isSubmittingComment}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-60"
                />
                <Button
                  type="button"
                  onClick={() => void handleAddComment()}
                  disabled={isSubmittingComment || !commentText.trim()}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 disabled:opacity-60 disabled:pointer-events-none"
                >
                  {isSubmittingComment ? '...' : t('community.send')}
                </Button>
              </div>
            </div>

            {/* 댓글 목록 */}
            {comments.length > 0 && (
              <div className="space-y-3 border-t pt-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className={`p-3 rounded-lg ${comment.isHidden ? 'bg-amber-50 border border-amber-100' : 'bg-gray-50'}`}
                  >
                    <div className="flex items-center justify-between mb-1 gap-2">
                      <CommunityAuthorMeta
                        author={comment.author}
                        date={comment.date}
                        meta={getAuthorMeta(comment.author)}
                        size="sm"
                        className="flex-1 min-w-0"
                        trailing={
                          comment.isHidden ? (
                            <span className="text-[10px] text-amber-700 shrink-0">
                              ({t('community.hiddenBadge')})
                            </span>
                          ) : null
                        }
                      />
                      <div className="flex items-center gap-2 shrink-0">
                        {!masterLoading && isMaster && (
                          <button
                            type="button"
                            onClick={() => void handleHideComment(comment.id)}
                            className="flex items-center gap-0.5 text-xs text-amber-600 hover:text-amber-700"
                          >
                            <EyeOff className="h-3 w-3" />
                            {t('community.hideComment')}
                          </button>
                        )}
                        {!masterLoading &&
                          canDeleteComment(comment, linkedNickname, isMaster) && (
                          <button
                            type="button"
                            onClick={() => void handleDeleteComment(comment.id)}
                            className="flex items-center gap-0.5 text-xs text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-3 w-3" />
                            {t('community.deleteComment')}
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{comment.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
