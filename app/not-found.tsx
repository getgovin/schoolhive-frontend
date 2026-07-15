"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "antd";
import {
  HomeOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-5">

    


        <div className="grid items-center gap-10 md:grid-cols-2">


   

          <div className="flex justify-center">

            <Image
              src="/gifs/404.svg"
              alt="404"
              width={600}
              height={600}
              priority
              className="drop-shadow-2xl"
            />

          </div>
          <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">

              <Link href="/">
                <Button
                  type="primary"
                  size="large"
                  icon={<HomeOutlined />}
                  className="!h-12 !px-8"
                  
                  onClick={() => router.push('/school-admin/dashboard')}
                >
                  Go Dashboard
                </Button>
              </Link>

              <Button
                size="large"
                icon={<ArrowLeftOutlined />}
                className="!h-12 !px-8"
                onClick={() => router.back()}
              >

                Go Back
              </Button>

            </div>

        </div>


    </main>
  );
}