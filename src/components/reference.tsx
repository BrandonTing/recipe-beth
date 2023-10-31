

export default function reference() {
    const referenceList = [
        "原食譜",
        "料理影片",
        "xx購買連結"
    ]
    return (
        <div class="space-y-8 inline-block align-top">
            <div class="flex flex-col space-y-4 m-auto  min-w-fit w-1/4">
                <ul>
                    {
                        referenceList.map(link => (
                            <li class="py-2">
                                <a href="#">
                                    <h2 class="text-blue-500 text-2xl border-b-2">{link}</h2>
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>

    )
}