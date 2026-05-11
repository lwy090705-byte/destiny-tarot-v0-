/**
 * localStorage 안전 접근 유틸리티
 * 모든 localStorage 작업을 try-catch로 보호
 */

export const safeStorage = {
  /**
   * 값을 localStorage에 저장
   * @param key 저장할 키
   * @param value 저장할 값 (자동으로 JSON 직렬화됨)
   * @returns 성공 여부
   */
  setItem(key: string, value: unknown): boolean {
    try {
      const serialized = JSON.stringify(value)
      // 크기 체크 (1MB 이상이면 저장 안 함)
      if (serialized.length > 1048576) {
        console.log('[v0] Storage item too large, skipping:', key)
        return false
      }
      localStorage.setItem(key, serialized)
      return true
    } catch (error) {
      console.log('[v0] Storage setItem error:', key, error)
      return false
    }
  },

  /**
   * localStorage에서 값을 가져옴
   * @param key 가져올 키
   * @param defaultValue 실패 시 반환할 기본값
   * @returns 저장된 값 또는 기본값
   */
  getItem<T = unknown>(key: string, defaultValue: T | null = null): T | null {
    try {
      const item = localStorage.getItem(key)
      if (!item) return defaultValue
      const parsed = JSON.parse(item)
      return parsed as T
    } catch (error) {
      console.log('[v0] Storage getItem error:', key, error)
      return defaultValue
    }
  },

  /**
   * localStorage에서 항목 삭제
   * @param key 삭제할 키
   * @returns 성공 여부
   */
  removeItem(key: string): boolean {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.log('[v0] Storage removeItem error:', key, error)
      return false
    }
  },

  /**
   * localStorage 전체 초기화
   * @returns 성공 여부
   */
  clear(): boolean {
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.log('[v0] Storage clear error:', error)
      return false
    }
  },

  /**
   * 특정 키 존재 여부 확인
   * @param key 확인할 키
   * @returns 존재 여부
   */
  hasItem(key: string): boolean {
    try {
      return localStorage.getItem(key) !== null
    } catch (error) {
      console.log('[v0] Storage hasItem error:', key, error)
      return false
    }
  },
}
