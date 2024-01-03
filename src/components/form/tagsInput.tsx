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
            <div class="flex">
                <input
                    placeholder="新增標籤"
                    type="text"
                    name="newTag"
                    class="block rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
            </div>
            <input type="text" name="tags" hidden value={tags.join(",")} />
            <div class="flex pt-2">
                <Tags tags={tags} />
            </div>
        </div>
    );
}
