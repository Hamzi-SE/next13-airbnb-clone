import { create } from 'zustand'

interface rentStore {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

const useRentModal = create<rentStore>(set => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}))

export default useRentModal
