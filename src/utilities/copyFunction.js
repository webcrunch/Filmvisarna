export default async function copyContent(str) {
  try {
    await navigator.clipboard.writeText(str);
    /* Resolved - text copied to clipboard successfully */
  } catch (err) {
    /* Rejected - text failed to copy to the clipboard */
  }
}
