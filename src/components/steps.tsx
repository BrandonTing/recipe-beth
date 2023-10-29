

export default function steps() {
    return (
        <ul class="mt-6 space-y-8 w-2/3 m-auto">
            <li class="flex items-start">
                <img
                    src="/public/placeholder.svg"
                    alt="Step 1"
                    width="100"
                    height="100"
                    class="rounded-md object-cover"
                    style="aspect-ratio: 100 / 100; object-fit: cover;"
                />
                <div class="ml-4">
                    <h2 class="text-xl font-bold">Step 1: Gather your ingredients</h2>
                    <p class="mt-1 text-base text-gray-500">
                    You will need apples, flour, sugar, butter, and cinnamon for this recipe.
                    </p>
                </div>
            </li>
            <li class="flex items-start">
                <img
                    src="/public/placeholder.svg"
                    alt="Step 2"
                    width="100"
                    height="100"
                    class="rounded-md object-cover"
                    style="aspect-ratio: 100 / 100; object-fit: cover;"
                />
                <div class="ml-4">
                    <h2 class="text-xl font-bold">Step 2: Prepare your apples</h2>
                    <p class="mt-1 text-base text-gray-500">Peel and core your apples, then slice them into thin pieces.</p>
                </div>
                </li>
                <li class="flex items-start">
                <img
                    src="/public/placeholder.svg"
                    alt="Step 3"
                    width="100"
                    height="100"
                    class="rounded-md object-cover"
                    style="aspect-ratio: 100 / 100; object-fit: cover;"
                />
                <div class="ml-4">
                    <h2 class="text-xl font-bold">Step 3: Make the pie crust</h2>
                    <p class="mt-1 text-base text-gray-500">
                    Combine the flour and butter to make your pie crust. Roll it out and place it in your pie dish.
                    </p>
                </div>
                </li>
        </ul>
    )
}