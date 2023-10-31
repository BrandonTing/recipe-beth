

export default function steps() {
    const testData = [
        {
            name: "Gather your ingredients",
            description: "You will need apples, flour, sugar, butter, and cinnamon for this recipe."
        },
        {
            name: "Prepare your apples",
            description: "Peel and core your apples, then slice them into thin pieces."
        },
        {
            name: "Make the pie crust",
            description: "Combine the flour and butter to make your pie crust. Roll it out and place it in your pie dish."
        },
    ]
    return (
        <ul class="space-y-8 inline-block align-top">
            {
                testData.map((step, i) => (
                    <li class="flex items-start">
                        {/* <img
                            src="/public/placeholder.svg"
                            alt="Step 1"
                            width="100"
                            height="100"
                            class="rounded-md object-cover"
                            style="aspect-ratio: 100 / 100; object-fit: cover;"
                        /> */}
                        <div class="ml-4">
                            <h2 class="text-xl font-bold">Step {i+1}: {step.name}</h2>
                            <p class="mt-1 text-base text-gray-500">
                                {step.description}
                            </p>
                        </div>
                    </li>    
                ))
            }
       </ul>
    )
}