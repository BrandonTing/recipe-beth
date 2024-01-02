export function GetEstimatedTimeText(estimatedTime: number): string {
    const hour =
        estimatedTime >= 60 ? `${Math.floor(estimatedTime / 60)}小時 ` : "";
    return `${hour}${estimatedTime % 60} 分鐘`;
}
