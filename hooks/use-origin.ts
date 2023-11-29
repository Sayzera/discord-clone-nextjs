import { use, useEffect, useState } from "react"

/**
 * 
 * @returns {string} origin
 * @description Bize mevcut sayfanın originini döndürür. Örnek: https://www.example.com gibi
 */
export const useOrigin = () => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : ''

    if(!mounted) return ''

    return origin

}