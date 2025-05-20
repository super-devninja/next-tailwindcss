'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BlinkingGrid } from '@/components/ui/blinking-grid';
import { Card, CardContent } from "@/components/ui/download_card";
import { Separator } from "@/components/ui/download_separator";
import { FlickeringGrid } from '@/components/ui/FlickeringGrid';

export const Connect_downloading = () => {
  const router = useRouter();
  const [leagues, setLeagues] = useState([
    { name: "League Delta", status: "pending" },
    { name: "League Alpha", status: "pending" },
    { name: "League Gamma", status: "pending" },
    { name: "League Beta", status: "pending" },
  ]);

  useEffect(() => {
    const loadLeagues = async () => {
      for (let i = 0; i < leagues.length; i++) {
        // Start loading each league after a delay
        setTimeout(() => {
          setLeagues(prevLeagues => {
            const newLeagues = [...prevLeagues];
            newLeagues[i] = { ...newLeagues[i], status: "loading" };
            return newLeagues;
          });

          // Set completed status after 3 seconds
          setTimeout(() => {
            setLeagues(prevLeagues => {
              const newLeagues = [...prevLeagues];
              newLeagues[i] = { ...newLeagues[i], status: "completed" };
              
              // Check if all leagues are completed before navigating
              const allCompleted = newLeagues.every(league => league.status === "completed");
              if (allCompleted) {
                setTimeout(() => {
                  // router.push('/dashboard');
                }, 1000);
              }
              
              return newLeagues;
            });
          }, 3000);
        }, i * 3000); // Start each league loading 3 seconds after the previous
      }
    };

    loadLeagues();
  }, [router]);

  // Data for connection steps
  const connectionSteps = [
    { title: "Connecting to platform", status: "completed" },
    {
      title: "Finding Active Slates",
      status: "completed",
      subtitle: "4 leagues found",
    },
  ];

  return (
    <div className="flex flex-col h-[950px] items-center justify-center relative bg-bgmain overflow-hidden">
      <BlinkingGrid />
      <div className="fixed inset-0 w-screen h-screen bg-gradient-to-r from-black via-[#030f01]/80 to-[#030f01] z-0 opacity-50" />
      

      <div className="text-white bg-[#030303] flex flex-col items-start gap-6 p-8 relative bg-bgmain w-[480px] h-[578px] rounded-[6px]">
        <div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
          <img className="relative w-5 h-5" alt="Frame" src="/espn.svg" />
          <div className="relative w-fit font-label-large font-[number:var(--label-large-font-weight)] text-contentloud text-[length:var(--label-large-font-size)] tracking-[var(--label-large-letter-spacing)] leading-[var(--label-large-line-height)] whitespace-nowrap [font-style:var(--label-large-font-style)]">
            Downloading data
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 relative self-stretch w-[416] h-[420] flex-[0_0_auto]">
          {connectionSteps.map((step, index) => (
            <Card
              key={index}
              className="w-[416px] h-[80px] bg-bgforeground border-none rounded-md overflow-hidden"
            >
              <CardContent className="h-[81] flex p-6 bg-[#141414]">
                <div className="flex flex-col justify-center relative grow">
                  <div className="text-[16px] text-[#B5FF4D]">
                    {step.title}
                  </div>
                  {step.subtitle && (
                    <div className="text-[#ccccc5] text-[14px]">
                      <div className="relative w-fit">
                        {step.subtitle}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex w-[32px] h-[32px] gap-1.5 px-2 py-1.5 relative bg-[#262626] rounded border-t-[0.5px] [border-top-style:solid] border-[#ffffff1a]">
                  {step.status === "completed" && (
                    <img
                      className="relative w-4 h-4"
                      alt="Checkmark"
                      src="/checkmark-2.svg"
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="w-full h-[235px] bg-[#141414] flex-col items-start justify-center border-none rounded-md overflow-hidden">
            <CardContent className="flex flex-col gap-1 p-6 relative">
              <FlickeringGrid className="absolute inset-1" />
              <div className="relative self-stretch text-white mt-[-3px] font-body-base font-[number:var(--body-base-font-weight)] text-contentloud text-[length:var(--body-base-font-size)] tracking-[var(--body-base-letter-spacing)] leading-[var(--body-base-line-height)] [font-style:var(--body-base-font-style)] z-10 mb-1">
                Loading Leagues
              </div>

              <div className="flex flex-col items-start gap-2 p-3 relative self-stretch w-full flex-[0_0_auto] bg-[#26262699] rounded backdrop-blur-sm backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(4px)_brightness(100%)] z-10">
                {leagues.map((league, index) => (
                  <React.Fragment key={index}>
                    <div className="flex items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
                      <div
                        className={`relative flex-1 font-body-small font-[number:var(--body-small-font-weight)] text-[14px] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)] [font-style:var(--body-small-font-style)] ${
                          league.status === "completed"
                            ? "text-[#B5FF4D]"
                            : league.status === "loading"
                              ? "text-[#9D9D95]"
                              : "text-[#9D9D95]"
                        }`}
                      >
                        {league.name}
                      </div>
                      {league.status === "completed" && (
                        <img
                          className="relative w-3 h-3"
                          alt="Checkmark"
                          src="/checkmark-2.svg"
                        />
                      )}
                      {league.status === "loading" && (
                        <div className="w-3 h-3 border-2 border-brandcontent border-t-transparent rounded-full animate-spin" />
                      )}
                    </div>

                    {index < leagues.length - 1 && (
                      <Separator className="w-full h-px" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="relative self-stretch font-body-small font-[number:var(--body-small-font-weight)] text-contentsubdued text-[length:var(--body-small-font-size)] text-center tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)] [font-style:var(--body-small-font-style)]">
          We&apos;ll redirect you once done.
        </div>
      </div>
    </div>
  );
};
