import { Step } from "../db/schema"

export default function steps({steps}: {steps: Array<Step>}) {
    return (
        <ul class="space-y-8 inline-block align-top">
            {
                steps.map((step, i) => (
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
                            <h2 class="text-xl font-bold">Step {i+1}: {step.title}</h2>
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