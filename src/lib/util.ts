export function GetEstimatedTimeText(estimatedTime: number): string {
    return `${estimatedTime >= 60 ? `${Math.floor(estimatedTime / 60)}小時 ` : ''}${estimatedTime % 60} 分鐘`
}