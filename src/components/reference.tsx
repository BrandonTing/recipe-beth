export default function reference() {
    const referenceList = ["原食譜", "料理影片", "xx購買連結"];
    return (
        <div class="inline-block space-y-8 align-top">
            <div class="m-auto flex w-1/4 min-w-fit  flex-col space-y-4">
                <ul>
                    {referenceList.map((link) => (
                        <li class="py-2">
                            <a href="#">
                                <h2 class="border-b-2 text-2xl text-blue-500">
                                    {link}
                                </h2>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
