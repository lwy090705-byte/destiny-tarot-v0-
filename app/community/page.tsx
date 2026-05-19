"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { ArrowLeft, Heart, MessageCircle, ThumbsUp, Star, Flame, Plus, Search, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import {
  COMMUNITY_CATEGORY_COLOR,
  getCommunitySamplePosts,
  type CommunityCategoryKey,
  type CommunitySamplePost,
} from "@/lib/community-sample-posts"

const PAGE_SIZE = 10

type Post = CommunitySamplePost & {
  userLikes?: number[]
}

function PostCard({ post, onLike, onSelect, currentUserId, isUserLiked, t }: { post: Post; onLike: (id: number) => void; onSelect: (post: Post) => void; currentUserId: number; isUserLiked: boolean; t: (k: string) => string }) {
  return (
    <div onClick={() => onSelect(post)} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${COMMUNITY_CATEGORY_COLOR[post.categoryKey]}`}>
              {t(`community.category.${post.categoryKey}`)}
            </span>
            {post.isRecommended && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 flex items-center gap-1">
                <Star className="h-2.5 w-2.5" />
                {t('community.recommendedBadge')}
              </span>
            )}
          </div>
          <h3 className="font-bold text-gray-800 text-sm leading-snug line-clamp-2">{post.title}</h3>
        </div>
      </div>
      <p className="text-gray-500 text-xs line-clamp-2 mb-3">{post.preview}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="font-medium text-gray-600">{post.author}</span>
          <span>{post.date}</span>
        </div>
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

export default function CommunityPage() {
  const { t, language } = useLanguage()
  const [currentUserId] = useState(() => Math.floor(Math.random() * 1000000))
  const [posts, setPosts] = useState<Post[]>(() =>
    getCommunitySamplePosts(language).map((p) => ({ ...p, userLikes: [] }))
  )
  const [activeTab, setActiveTab] = useState<'latest' | 'recommended'>('latest')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showWriteModal, setShowWriteModal] = useState(false)
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
  const [newPostCategory, setNewPostCategory] = useState<CommunityCategoryKey>('other')
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState<Array<{ id: number; author: string; date: string; text: string }>>([])
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const loaderRef = useRef<HTMLDivElement>(null)

  // Toggle like with user tracking and prevention of duplicate likes
  const handleLike = (id: number) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        const userLikes = p.userLikes || []
        const hasLiked = userLikes.includes(currentUserId)
        
        return {
          ...p,
          likes: hasLiked ? p.likes - 1 : p.likes + 1,
          userLikes: hasLiked 
            ? userLikes.filter(uid => uid !== currentUserId)
            : [...userLikes, currentUserId]
        }
      }
      return p
    }))

    // Update selectedPost if it's currently open
    if (selectedPost && selectedPost.id === id) {
      const userLikes = selectedPost.userLikes || []
      const hasLiked = userLikes.includes(currentUserId)
      
      setSelectedPost(prev => prev ? {
        ...prev,
        likes: hasLiked ? prev.likes - 1 : prev.likes + 1,
        userLikes: hasLiked 
          ? userLikes.filter(uid => uid !== currentUserId)
          : [...userLikes, currentUserId]
      } : null)
    }
  }

  const isPostLikedByUser = (postId: number) => {
    const post = posts.find(p => p.id === postId)
    return post?.userLikes?.includes(currentUserId) ?? false
  }

  const handleWritePost = () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      const newPost: Post = {
        id: Math.max(...posts.map(p => p.id), 0) + 1,
        title: newPostTitle,
        author: t('community.anonymous'),
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        comments: 0,
        categoryKey: newPostCategory,
        preview: newPostContent.substring(0, 100),
        isRecommended: false,
      }
      setPosts(prev => [newPost, ...prev])
      setNewPostTitle('')
      setNewPostContent('')
      setNewPostCategory('other')
      setShowWriteModal(false)
    }
  }

  const handleAddComment = () => {
    if (commentText.trim() && selectedPost) {
      const newComment = {
        id: comments.length + 1,
        author: t('community.anonymous'),
        date: new Date().toISOString().split('T')[0],
        text: commentText,
      }
      setComments(prev => [...prev, newComment])
      setCommentText('')
      setPosts(prev => prev.map(p => p.id === selectedPost.id ? { ...p, comments: p.comments + 1 } : p))
      setSelectedPost(prev => prev ? { ...prev, comments: prev.comments + 1 } : null)
    }
  }

  const latestPosts = posts
    .filter(p =>
      p.title.includes(searchQuery) ||
      p.author.includes(searchQuery) ||
      t(`community.category.${p.categoryKey}`).includes(searchQuery)
    )
    .sort((a, b) => b.id - a.id)

  const recommendedPosts = posts
    .filter(p => p.isRecommended)
    .sort((a, b) => b.likes - a.likes)

  const allDisplayPosts = activeTab === 'latest' ? latestPosts : recommendedPosts
  const displayPosts = allDisplayPosts.slice(0, visibleCount)
  const hasMore = visibleCount < allDisplayPosts.length

  useEffect(() => {
    setPosts(getCommunitySamplePosts(language).map((p) => ({ ...p, userLikes: [] })))
    setVisibleCount(PAGE_SIZE)
    setSelectedPost(null)
  }, [language])

  // 탭이나 검색어 변경 시 visibleCount 초기화
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [activeTab, searchQuery])

  // IntersectionObserver로 스크롤 시 자동 추가 로드
  useEffect(() => {
    const node = loaderRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setVisibleCount(prev => Math.min(prev + PAGE_SIZE, allDisplayPosts.length))
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(node)

    return () => {
      observer.unobserve(node)
      observer.disconnect()
    }
  }, [hasMore, allDisplayPosts.length])

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* 헤더 */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10 shadow-sm">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
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
        {/* 검색 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={t('community.searchPlaceholder')}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

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
              <PostCard key={post.id} post={post} onLike={handleLike} onSelect={setSelectedPost} currentUserId={currentUserId} isUserLiked={isPostLikedByUser(post.id)} t={t} />
            ))
          ) : (
            <div className="text-center py-12 text-gray-400">
              <MessageCircle className="h-10 w-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm">{t('community.empty')}</p>
            </div>
          )}

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
              <button onClick={() => setShowWriteModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">{t('community.labelTitle')}</label>
                <input type="text" value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} placeholder={t('community.placeholderTitle')} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">{t('community.labelContent')}</label>
                <textarea value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} placeholder={t('community.placeholderContent')} rows={6} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none" />
              </div>
              <Button onClick={handleWritePost} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold">
                {t('community.publish')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 게시글 상세 모달 */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <button onClick={() => { setSelectedPost(null); setComments([]); setCommentText(''); }} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${COMMUNITY_CATEGORY_COLOR[selectedPost.categoryKey]}`}>
                  {t(`community.category.${selectedPost.categoryKey}`)}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">{selectedPost.title}</h2>
              <p className="text-xs text-gray-500 mb-4">{selectedPost.author} · {selectedPost.date}</p>
              <p className="text-gray-700 mb-6 leading-relaxed">{selectedPost.preview}</p>
              <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleLike(selectedPost.id)
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
                <input type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder={t('community.placeholderComment')} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                <Button onClick={handleAddComment} className="bg-purple-600 hover:bg-purple-700 text-white px-4">
                  {t('community.send')}
                </Button>
              </div>
            </div>

            {/* 댓글 목록 */}
            {comments.length > 0 && (
              <div className="space-y-3 border-t pt-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm text-gray-800">{comment.author}</span>
                      <span className="text-xs text-gray-500">{comment.date}</span>
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
