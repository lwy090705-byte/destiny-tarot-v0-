'use client'

import React, { ReactNode, ReactElement } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactElement
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    console.log('[v0] ErrorBoundary caught error:', error)
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log('[v0] Error boundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="w-full p-6 bg-red-50 border-l-4 border-red-400 rounded-lg">
            <h3 className="text-lg font-semibold text-red-900 mb-2">오류가 발생했습니다</h3>
            <p className="text-red-800 text-sm mb-4">페이지를 새로고침하거나 잠시 후 다시 시도해주세요.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium"
            >
              새로고침
            </button>
          </div>
        )
      )
    }

    return this.props.children
  }
}
