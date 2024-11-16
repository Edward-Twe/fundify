'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Category1 from "@/public/d1.png"
import Category2 from "@/public/d11.png"
import Category3 from "@/public/d2.png"

export default function Donation() {
  const router = useRouter();

  const donationCategories = [
    { id: 1, src: Category1, alt: 'Category 1', title: 'Tabung Harapan Malaysia', campaignid:'0xD7FD295Fe2f1cdBe6DfCd581Bb5DeeF16D90C6F5' },
    { id: 2, src: Category2, alt: 'Category 2', title: 'eBelia', campaignid:'0xA146E5F2fdA9BFB468Ae1fB1E0a7C169a98Cf63c' },
    { id: 3, src: Category3, alt: 'Category 3', title: 'Food Aid Foundation', campaignid:'0x232f102062e3c850Ede6f426f3ae85674146014D' },
  ];

  const handleGridItemClick = (id: string) => {
    router.push(`/donationdetails/${id}`);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#151E30' }}>
      {/* Image Box */}
      <div className="w-full relative">
        <Image
          src="/donationBBB.png"
          alt="Donation Banner"
          width={1700}
          height={200}
          objectFit="contain"
        />
      </div>

      {/* Donation Categories Grid */}
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 text-white">
          Urgent Fundraising
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {donationCategories.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-center items-center space-y-4 cursor-pointer"
              onClick={() => handleGridItemClick(item.campaignid)}
            >
              {/* Image */}
              <div className="relative w-full h-[178px]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>

              {/* Textbox below image */}
              <div className="bg-[#D8F9FF] text-[#151E30] px-6 py-3 rounded-full font-semibold shadow-lg transition-all hover:bg-[#A7D8F7] w-64 mx-auto text-center">
                <h3 className="text-sm font-semibold text-[#151E30]">{item.title}</h3>
            </div>

            </div>
          ))}
        </div>
      </div>

      {/* Additional Content */}
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl lg:text-5xl font-bold mb-6 text-white">317,918 +</h2>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-white">
            People From Around the World Donated
          </h2>
        </div>
        <div className="bg-[#D8F9FF] text-[#151E30] px-6 py-3 rounded-full font-semibold shadow-lg transition-all hover:bg-[#A7D8F7] w-64 mx-auto text-center hover:cursor-pointer"
        onClick={() => router.push(`/donate`)}>
                <h3 className="text-sm font-semibold text-[#151E30]">See More</h3>
            </div>
      </div>
    </div>
  );
}
