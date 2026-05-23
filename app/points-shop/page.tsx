"use client"

import { useState, useMemo, useEffect } from "react"
import { ArrowLeft, Coins, CreditCard, History, Gift, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePoints } from "@/lib/points-context"
import { useLanguage } from "@/lib/language-context"

interface Purchase {
  id: string
  date: string
  type: 'premium' | 'points'
  description: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
}

const POINT_PACKAGES = [
  { id: '100', points: 100, price: '10 Pi', priceNum: 10, bonus: 0 },
  { id: '500', points: 500, price: '40 Pi', priceNum: 40, bonus: 50 },
  { id: '1000', points: 1000, price: '70 Pi', priceNum: 70, bonus: 200 },
  { id: '2000', points: 2000, price: '120 Pi', priceNum: 120, bonus: 500 },
]

export default function PointsShopPage() {
  const { addPoints } = usePoints()
  const { t, language } = useLanguage()

  const AD_REWARDS = useMemo(
    () => [
      { id: '1', duration: t('pointsShop.adDuration15'), durationSec: 15, reward: 10, description: t('pointsShop.adShort') },
      { id: '2', duration: t('pointsShop.adDuration30'), durationSec: 30, reward: 20, description: t('pointsShop.adStandard') },
      { id: '3', duration: t('pointsShop.adDuration60'), durationSec: 60, reward: 50, description: t('pointsShop.adLong') },
    ],
    [t]
  )
  
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showAdReward, setShowAdReward] = useState(false)
  const [selectedAd, setSelectedAd] = useState<string | null>(null)
  const [isWatchingAd, setIsWatchingAd] = useState(false)
  const [adProgress, setAdProgress] = useState(0)
  const [purchases, setPurchases] = useState<Purchase[]>([])

  useEffect(() => {
    setPurchases([
      {
        id: '1',
        date: '2026-01-15',
        type: 'points',
        description: t('pointsShop.purchasePoints').replace('{n}', '500'),
        amount: 500,
        status: 'completed',
      },
      {
        id: '2',
        date: '2026-01-10',
        type: 'premium',
        description: t('pointsShop.premiumMonth'),
        amount: 20,
        status: 'completed',
      },
    ])
  }, [t, language])

  const selectedPackageData = POINT_PACKAGES.find(p => p.id === selectedPackage)
  const selectedAdData = AD_REWARDS.find(a => a.id === selectedAd)

  const handlePurchase = (packageId: string) => {
    setSelectedPackage(packageId)
    setShowPaymentModal(true)
  }

  const handlePaymentConfirm = () => {
    if (selectedPackageData) {
      // 실제 결제 처리 후 포인트 추가
      addPoints(selectedPackageData.points + selectedPackageData.bonus, {
        point_type: "purchase",
        description: `Points package purchase (+${selectedPackageData.points + selectedPackageData.bonus}P)`,
      })
      
      // 구매 기록 추가
      const newPurchase: Purchase = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        type: 'points',
        description: t('pointsShop.purchasePointsBonus')
          .replace('{n}', String(selectedPackageData.points))
          .replace('{bonus}', String(selectedPackageData.bonus)),
        amount: selectedPackageData.priceNum,
        status: 'completed'
      }
      setPurchases([newPurchase, ...purchases])
      
      setShowPaymentModal(false)
      setSelectedPackage(null)
    }
  }

  const handleWatchAd = () => {
    if (selectedAdData) {
      setIsWatchingAd(true)
      setAdProgress(0)
      
      // 광고 시청 시뮬레이션
      const adDuration = selectedAdData.durationSec * 1000
      const interval = setInterval(() => {
        setAdProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + (100 / (adDuration / 100))
        })
      }, 100)
      
      setTimeout(() => {
        setIsWatchingAd(false)
        addPoints(selectedAdData.reward, {
          point_type: "ad_shop",
          description: `Points shop ad reward (+${selectedAdData.reward}P)`,
        })
        
        // 구매 기록 추가
        const newPurchase: Purchase = {
          id: Date.now().toString(),
          date: new Date().toISOString().split('T')[0],
          type: 'points',
          description: t('pointsShop.adRewardDesc').replace('{duration}', selectedAdData.duration),
          amount: 0,
          status: 'completed'
        }
        setPurchases([newPurchase, ...purchases])
        
        setShowAdReward(false)
        setSelectedAd(null)
      }, adDuration)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 pb-16">
      {/* 헤더 */}
      <div className="sticky top-0 bg-purple-900/90 backdrop-blur-sm border-b border-purple-700/50 z-10">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/user-profile">
            <ArrowLeft className="h-6 w-6 text-white" />
          </Link>
          <h1 className="text-lg font-bold text-white">{t('pointsShop.title')}</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* 포인트 구매 섹션 */}
        <div className="space-y-3">
          <h2 className="text-white font-bold text-base flex items-center gap-2">
            <Coins className="h-5 w-5 text-amber-400" />
            {t('pointsShop.packages')}
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            {POINT_PACKAGES.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => handlePurchase(pkg.id)}
                className="bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-white/40 rounded-xl p-4 text-left transition-all group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Coins className="h-4 w-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="text-white font-bold text-lg">{pkg.points}</span>
                </div>
                <p className="text-purple-200 text-xs mb-2">{pkg.price}</p>
                {pkg.bonus > 0 && (
                  <p className="text-green-400 text-xs font-semibold">{t('pointsShop.bonus').replace('{n}', String(pkg.bonus))}</p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 광고 시청 섹션 */}
        <div className="space-y-3">
          <h2 className="text-white font-bold text-base flex items-center gap-2">
            <Play className="h-5 w-5 text-blue-400" />
            {t('pointsShop.adRewards')}
          </h2>
          
          <button
            onClick={() => setShowAdReward(true)}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl p-4 text-white transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Gift className="h-5 w-5" />
                <span className="font-semibold">{t('pointsShop.watchAdCta')}</span>
              </div>
            </div>
          </button>
        </div>

        {/* 거래 내역 섹션 */}
        <div className="space-y-3">
          <h2 className="text-white font-bold text-base flex items-center gap-2">
            <History className="h-5 w-5 text-purple-300" />
            {t('pointsShop.history')}
          </h2>
          
          <div className="space-y-2">
            {purchases.length > 0 ? (
              purchases.map((purchase) => (
                <div
                  key={purchase.id}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{purchase.description}</p>
                    <p className="text-purple-300 text-xs">{purchase.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-amber-400 font-bold text-sm">
                      {purchase.type === 'points' ? `+${purchase.amount} P` : `-${purchase.amount} Pi`}
                    </p>
                    <span className="text-xs text-green-400">{t('pointsShop.statusDone')}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-purple-300 text-sm text-center py-4">{t('pointsShop.noHistory')}</p>
            )}
          </div>
        </div>
      </div>

      {/* 결제 모달 */}
      {showPaymentModal && selectedPackageData && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-center text-gray-800 mb-4">{t('pointsShop.buyTitle')}</h3>
            <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">{t('pointsShop.packageLabel')}</span>
                <span className="font-bold text-gray-800">{selectedPackageData.points}P</span>
              </div>
              {selectedPackageData.bonus > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>{t('pointsShop.bonusLabel')}</span>
                  <span className="font-bold">+{selectedPackageData.bonus}P</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-2 flex justify-between">
                <span className="font-semibold text-gray-800">{t('pointsShop.totalPoints')}</span>
                <span className="font-bold text-lg text-purple-600">
                  {selectedPackageData.points + selectedPackageData.bonus}P
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">{t('pointsShop.payAmount')}</span>
                <span className="font-bold text-gray-800 text-sm">{selectedPackageData.price}</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm text-center mb-5">
              {t('pointsShop.payConfirm').split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 ? <br /> : null}</span>
              ))}
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowPaymentModal(false)}
              >
                {t('announcements.cancel')}
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
                onClick={handlePaymentConfirm}
              >
                {t('pointsShop.pay')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 광고 선택 모달 */}
      {showAdReward && !isWatchingAd && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-center text-gray-800 mb-4">{t('pointsShop.selectAd')}</h3>
            <div className="space-y-2 mb-5">
              {AD_REWARDS.map((ad) => (
                <button
                  key={ad.id}
                  onClick={() => setSelectedAd(ad.id)}
                  className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                    selectedAd === ad.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{ad.description}</p>
                      <p className="text-sm text-gray-500">{ad.duration}</p>
                    </div>
                    <p className="font-bold text-green-600">+{ad.reward}P</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => { setShowAdReward(false); setSelectedAd(null) }}
              >
                {t('pointsShop.close')}
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0"
                onClick={handleWatchAd}
                disabled={!selectedAd}
              >
                {t('pointsShop.watchAd')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 광고 시청 중 */}
      {isWatchingAd && selectedAdData && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-sm w-full text-center">
            <p className="text-white text-lg font-bold mb-4">{t('pointsShop.watchingAd')}</p>
            <div className="bg-black rounded-lg p-8 mb-4 aspect-video flex items-center justify-center">
              <div className="text-center">
                <Play className="h-12 w-12 text-white/30 mx-auto mb-2" />
                <p className="text-white/60 text-sm">{selectedAdData.duration} 광고</p>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all"
                style={{ width: `${adProgress}%` }}
              />
            </div>
            <p className="text-white/60 text-xs">{t('pointsShop.completed')} {Math.round(adProgress)}%</p>
          </div>
        </div>
      )}
    </div>
  )
}
