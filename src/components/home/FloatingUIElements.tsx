import { memo } from "react";
import { TrendingUp, CheckCircle2, Zap, Clock } from "lucide-react";

export const FloatingUIElements = memo(function FloatingUIElements() {
  return (
    <div className="relative w-full h-full">
      {/* Main centered memo visualization */}
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl p-6 border border-gray-200 dark:border-gray-700 animate-float">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-6 w-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded" />
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded" />
              <div className="h-3 w-5/6 bg-gray-100 dark:bg-gray-800 rounded" />
              <div className="h-3 w-4/6 bg-gray-100 dark:bg-gray-800 rounded" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating metric card - top right */}
      <div className="absolute top-0 right-0 md:right-8 lg:right-16 z-20 animate-float-delayed hidden md:block">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-4 border border-gray-200 dark:border-gray-700 w-48">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Time Saved</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">10hrs</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating accuracy badge - bottom left */}
      <div className="absolute bottom-8 left-0 md:left-8 lg:left-16 z-20 animate-float-delayed-more hidden md:block">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-4 border border-gray-200 dark:border-gray-700 w-52">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">CPA Accuracy</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">99.8%</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating AI indicator - top left */}
      <div className="absolute top-12 left-0 md:left-4 lg:left-8 z-20 animate-float hidden lg:block">
        <div className="bg-white dark:bg-gray-900 rounded-full shadow-xl px-4 py-2 border border-gray-200 dark:border-gray-700 flex items-center gap-2">
          <Zap className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">AI Processing</span>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-yellow-500 rounded-full animate-pulse" />
            <div className="w-1 h-1 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
            <div className="w-1 h-1 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
          </div>
        </div>
      </div>
      
      {/* Floating speed indicator - bottom right */}
      <div className="absolute bottom-16 right-0 md:right-4 lg:right-8 z-20 animate-float-delayed hidden lg:block">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-3 border border-gray-200 dark:border-gray-700 flex items-center gap-2">
          <Clock className="h-5 w-5 text-purple-500" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Generated in</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">2.3s</p>
          </div>
        </div>
      </div>
    </div>
  );
});
