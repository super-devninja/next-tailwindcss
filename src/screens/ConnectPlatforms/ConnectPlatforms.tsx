import { CheckIcon, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { BlinkingGrid } from "../../components/ui/blinking-grid";

// Platform data for mapping
const platforms = [
  {
    id: 1,
    name: "Sleeper",
    icon: "/sleeper.png",
    isConnected: true,
    requiresTwoFactor: false,
  },
  {
    id: 2,
    name: "ESPN",
    icon: "/espn.svg",
    isConnected: false,
    requiresTwoFactor: true,
  },
  {
    id: 3,
    name: "Yahoo",
    icon: "/yahoo.png",
    isConnected: false,
    requiresTwoFactor: false,
  },
  {
    id: 4,
    name: "CBS",
    icon: "/cbs.png",
    isConnected: false,
    requiresTwoFactor: false,
  },
  {
    id: 5,
    name: "NFL.com",
    icon: "/nfl.png",
    isConnected: false,
    requiresTwoFactor: false,
  },
];

export const ConnectPlatforms = (): JSX.Element => {
  const router = useRouter();
  const [selectedPlatforms, setSelectedPlatforms] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);

  const togglePlatform = (id: number) => {
    setSelectedPlatforms(prev =>
      prev.includes(id)
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selectedPlatforms.includes(2) && selectedPlatforms.length == 1) { // If ESPN is selected
      router.push('/login');
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex pt-0 x-col items-center justify-center p-8 overflow-hidden">
      <BlinkingGrid />

      {/* Dark green overlay */}
      <div className="fixed inset-0 w-screen h-screen bg-gradient-to-r from-black via-[#030f01]/80 to-[#030f01] z-0 opacity-50" />

      <div className="relative z-10 w-full max-w-4xl">
        <div className="flex flex-col items-center gap-10">
          <img 
            src="/logo.svg" 
            alt="Stacked Logo" 
            className="w-[120px] h-[15px] mb-6"
          />
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-[30px] text-white font-['TacticSans-Med'] font-bold leading-[32px] tracking-[0.15em] font-bold text-center">
              Select platforms to<h1 />
              <h1 className="text-[30px] text-white font-['TacticSans-Med'] font-bold leading-[32px] tracking-[0.15em] text-center">connect to Stacked</h1>
            </h1>
            <div className="flex flex-col items-center gap-0">
              <p className="text-[16px] text-[#9D9D95] text-center">
                Continue tools to manage your Leagues.</p>
              <p className="text-[16px] text-[#9D9D95] text-center">Add at least one now, you can always add more later
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 w-full">
            {platforms.map((platform) => (
              <Card
                key={platform.id}
                className="w-[380px] h-[80px] bg-[#141414] rounded-[6px] border-none overflow-hidden"
              >
                <CardContent className="p-0 h-full">
                  <div className="flex items-center justify-between h-full px-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={platform.icon}
                        alt={platform.name}
                        className="w-8 h-8 object-contain"
                      />
                      <h3 className="text-lg text-white font-medium text-contentloud">
                        {platform.name}
                      </h3>
                    </div>
                    <Button
                      variant="default"
                      size="icon"
                      className={`w-8 h-8 rounded-sm ${selectedPlatforms.includes(platform.id)
                          ? 'bg-[#262626] text-[#B5FF4D] hover:bg-grey-600'
                          : 'bg-[#262626] text-[#CCCCC5] hover:bg-gray-150 '
                        }`}
                      onClick={() => togglePlatform(platform.id)}
                    >
                      {selectedPlatforms.includes(platform.id) ? (
                        <CheckIcon className="h-5 w-5" />
                      ) : (
                        <PlusIcon className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            className="h-[48px] w-[380px] bg-[#B5FF4D] rounded-[4px] text-[#030303] hover:bg-[#B5FF4D]/90 transition-colors text-lg"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
            <p className="text-gray-600 mb-6">
              Support for other platforms is coming soon. For now, please select only ESPN to continue.
            </p>
            <Button
              className="w-full"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};