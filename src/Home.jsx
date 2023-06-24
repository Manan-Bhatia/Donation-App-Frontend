export default function Home() {
    return (
        <>
        <div className="px-5 py-32 lg:px-8 lg:py-32 h-auto relative">
            <h1 className="text-5xl text-blue leading-[3.5rem] font-poppins font-medium lg:text-7xl lg:leading-[6rem]">Uniting for <span className="text-pink font-bold">Sustainability</span>,<br></br>One <span className="text-pink font-bold">Donation</span> at a Time !</h1>
            <div className="flex gap-3 j">
            <button className="mt-10 w-full py-2 text-white bg-pink font-inter font-semibold rounded-md lg:w-48">
                Donate NOW!
            </button>
            <button className="mt-10 w-full py-2 text-blue font-inter font-semibold rounded-md lg:w-48">
                View availble Items
                </button>            
            </div>
            <div className="absolute">
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
        </div>
        </div>
        </>
    )
}