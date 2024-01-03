import { Tags } from "../tags";
import Button from "../ui/button";

export function TagsInput({ tags = [] }: { tags?: string[] }) {
    return (
        <div class="mt-2" id="tagsInputContainer">
            {/* TODO */}
            {/* after click enter */}
            {/* 1. append tags to real inputs */}
            {/* 2. show new tag */}
            {/* 3. clear old input */}
            {/* after type */}
            {/* show possible options */}
            {/* after select */}
            {/* do what we do after click enter */}
            <div class="flex relative">
                <input
                    placeholder="新增標籤"
                    type="text"
                    name="newTag"
                    class="block rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    hx-get="/api/new/tagOptions"
                    hx-trigger="change delay 1s"
                />
                <Button
                    hx-trigger="click"
                    hx-post="/api/new/addTag"
                    hx-params="newTag,tags"
                    hx-target="#tagsInputContainer"
                    hx-swap="outerHtml"
                >
                    新增
                </Button>

                <div
                    id="tagOptionDropdown"
                    class="z-10 w-full absolute bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700 border top-[110%]"
                >
                    <ul
                        class="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDefaultButton"
                    >
                        <li
                            hx-trigger="click"
                            hx-post={`/api/new/addTag/test`}
                            hx-params="tags"
                            hx-target="#tagsInputContainer"
                            hx-swap="outerHtml"
                            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                        >
                            Dashboard
                        </li>
                        <li class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                            Dashboard
                        </li>
                        <li class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                            Dashboard
                        </li>
                    </ul>
                </div>
            </div>
            <input type="text" name="tags" hidden value={tags.join(",")} />
            <div class="flex pt-2">
                <Tags tags={tags} />
            </div>
        </div>
    );
}
