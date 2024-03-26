"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./banner.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Banner() {
  const covers = ["/img/1.jpg", "/img/2.jpg", "/img/3.jpg"];
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const { data: session } = useSession();
  // console.log(session);
  // console.log(session?.user.token);
  const token = session?.user.token;

  return (
    <div
      className={styles.banner}
      onClick={() => {
        setIndex(index + 1);
      }}
    >
      <div className="w-64 h-36 rounded-lg overflow-hidden shadow-md p-2">
      <div className="aspect-w-16 aspect-h-9">
        <Image
          src={covers[index % 3]}
          alt="cover"
          fill={true}
          priority
          objectFit="cover"
          className="w-full h-full rounded-lg"
        />
      </div>
    </div>
      <button
        className="bg-white text-cyan-600 border border-cyan-600
            font-semibold py-2 px-2 m-2 rounded z-30 absolute bottom-0 right-0
            hover:bg-cyan-600 hover:text-white hover:border-transparent"
        onClick={(e) => {
          router.push(`/booking/choosedate/?uid=${session?.user._id}`);
          e.stopPropagation();
        }}
      >
        Select The Dentist You Love Now
      </button>
    </div>
  );
}
