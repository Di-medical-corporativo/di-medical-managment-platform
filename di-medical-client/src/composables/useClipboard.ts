export const useClipboard = () => {
  const paste = async (text: string) => {
    const pastedText = await navigator.clipboard.writeText(text)
    return true
  }

  return {
    paste
  }
}
