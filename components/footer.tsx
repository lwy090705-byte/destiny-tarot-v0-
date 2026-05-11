import Link from "next/link"
import { Briefcase, Share2, User, ChevronRight } from "lucide-react"

export function Footer() {
  const links = [
    {
      title: "홈화면",
      description: "메인으로 돌아가기",
      href: "/",
      icon: Briefcase,
      bgColor: "bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600",
      iconBg: "bg-emerald-400/30",
      shadow: "shadow-emerald-500/30"
    },
    {
      title: "추천하기",
      description: "공유하고 보상받기",
      href: "/share",
      icon: Share2,
      bgColor: "bg-gradient-to-br from-orange-600 via-orange-500 to-red-600",
      iconBg: "bg-orange-400/30",
      shadow: "shadow-orange-500/30"
    },
    {
      title: "내 프로필",
      description: "포인트 및 업적",
      href: "/user-profile",
      icon: User,
      bgColor: "bg-gradient-to-br from-purple-600 via-pink-500 to-rose-600",
      iconBg: "bg-purple-400/30",
      shadow: "shadow-purple-500/30"
    }
  ]

  return (
    <footer className="mt-12">
      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-4">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <Link key={link.href} href={link.href}>
                <div className={`${link.bgColor} rounded-2xl p-5 shadow-xl ${link.shadow} hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer h-full border border-white/20`}>
                  <div className="flex flex-col space-y-3">
                    <div className={`${link.iconBg} backdrop-blur-sm rounded-xl p-3 w-fit`}>
                      <Icon className="h-6 w-6 text-white drop-shadow-lg" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base drop-shadow-lg">{link.title}</h3>
                      <p className="text-white font-semibold text-sm mt-1 drop-shadow-md">{link.description}</p>
                    </div>
                    <div className="flex justify-end">
                      <ChevronRight className="h-5 w-5 text-white drop-shadow-md" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        <div className="mt-8 text-center">
          <p className="text-purple-200/70 text-xs">© 2026 Fortune &amp; Tarot</p>
        </div>
      </div>
    </footer>
  )
}
