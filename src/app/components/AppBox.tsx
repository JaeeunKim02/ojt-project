import React from 'react';
import Image from 'next/image';

export default function AppBox({
  id,
  name,
  description,
  image,
}: {
  id: number;
  name: string;
  description: string;
  image: string;
}) {
  return (
    <a href={`/application2/${id}`}>
      {/* a 테그 안의 div 는 a 태그의 tailwind css 가 적용안됨 */}
      {/* a 태그 안에 span 이나 svg 같은 태그들은 a 태그의 tailwind css 가 적용됨. */}
      {/* a 태그 안에 또 a 태그 쓰는거 안됨! */}
      <div className="bg-slate-50 hover:bg-slate-100 p-[20px] items-start flex-shrink-0 h-[180px] rounded-xl transition ease-in-out delay-100 hover:-translate-y-2 hover:scale-102 shadow-sm hover:shadow-lg duration-150 cursor-pointer">
        <Image src={image} alt="picture" width="50" height="50" />
        <p id="AppName" className="text-[20px] font-bold mt-[10px] mb-[10px]">
          {name}
        </p>
        <p id="AppDescription" className="text-[15px]">
          {description}
        </p>
        <p id="AppDescription" className="text-[15px]">
          BAGELCODE
        </p>
      </div>
    </a>
  );
}
