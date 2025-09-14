"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { downloadUrls } from "@/lib/api";
import {
  Download,
  Music,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { RequestYTDL } from "@/models/request-ytdl";

interface DownloadStatus {
  url: string;
  status: "pending" | "downloading" | "completed" | "error";
  progress: number;
  error?: string;
  filename?: string;
}

export default function MusicDownloader() {
  const [urls, setUrls] = useState("");
  const [downloads, setDownloads] = useState<DownloadStatus[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    const urlList = urls.split("\n").filter((url) => url.trim());
    if (urlList.length === 0) return;

    setIsDownloading(true);
    const initialDownloads: DownloadStatus[] = urlList.map((url) => ({
      url: url.trim(),
      status: "pending",
      progress: 0,
    }));
    setDownloads(initialDownloads);

    for (let i = 0; i < initialDownloads.length; i++) {
      const currentUrl = urlList[i];

      setDownloads((prev) =>
        prev.map((download, index) =>
          index === i ? { ...download, status: "downloading" } : download,
        ),
      );

      // Call downloadYTDL with a single URL
      var fileName: string = '';

      try {
        const response = await downloadYTDL([currentUrl]);
        fileName = response[0].title;

      } catch (error) {
        console.error("Download error:", error);
        setDownloads((prev) =>
          prev.map((download, index) =>
            index === i
              ? {
                  ...download,
                  status: "error",
                  error: "Backend error occurred",
                }
              : download,
          ),
        );
        continue;
      }

      // Simulate progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        setDownloads((prev) =>
          prev.map((download, index) =>
            index === i ? { ...download, progress } : download,
          ),
        );
      }

      const isSuccess = Math.random() > 0.2; // 80% chance of success
      setDownloads((prev) =>
        prev.map((download, index) =>
          index === i
            ? {
                ...download,
                status: isSuccess ? "completed" : "error",
                filename: isSuccess ? `track ${i + 1}: ${fileName}.mp3` : undefined,
                error: !isSuccess ? "Failed to download" : undefined,
              }
            : download,
        ),
      );
    }

    setIsDownloading(false);
  };

  const getStatusIcon = (status: DownloadStatus["status"]) => {
    switch (status) {
      case "downloading":
        return <Loader2 className="h-4 w-4 animate-spin text-primary" />;
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Music className="h-4 w-4 text-muted-foreground" />;
    }
  };

  async function downloadYTDL(urls: string[]) {
    const request: RequestYTDL = {
      urls: [...urls],
    };

    return await downloadUrls(request);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-primary/10 backdrop-blur-sm">
              <Music className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">
            Music Downloader
          </h1>
          <p className="text-muted-foreground text-pretty">
            Paste multiple music URLs below, one per line, and download them all
            at once
          </p>
        </div>

        {/* Main Input Panel */}
        <Card className="glass-panel border-0 shadow-2xl">
          <CardContent className="p-8 space-y-6">
            <div className="space-y-3">
              <label htmlFor="urls" className="text-sm font-medium">
                Music URLs
              </label>
              <Textarea
                id="urls"
                placeholder="https://example.com/song1.mp3&#10;https://example.com/song2.mp3"
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
                className="min-h-[120px] resize-none glass-panel border-0 bg-input/50 backdrop-blur-sm text-sm leading-relaxed"
                disabled={isDownloading}
              />
            </div>

            <Button
              onClick={handleDownload}
              disabled={!urls.trim() || isDownloading}
              className="w-full glass-button bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 text-base rounded-xl"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-5 w-5" />
                  Download All
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Progress Panel */}
        {downloads.length > 0 && (
          <Card className="glass-panel border-0 shadow-2xl">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Download className="h-5 w-5" />
                Download Progress
              </h3>
              <div className="space-y-4">
                {downloads.map((download, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {getStatusIcon(download.status)}
                        <span className="truncate font-mono text-xs">
                          {download.filename || download.url}
                        </span>
                      </div>
                      <span className="text-muted-foreground ml-2">
                        {download.status === "completed"
                          ? "100%"
                          : download.status === "error"
                            ? "Failed"
                            : download.status === "downloading"
                              ? `${download.progress}%`
                              : "Pending"}
                      </span>
                    </div>
                    {download.status === "downloading" && (
                      <Progress value={download.progress} className="h-1" />
                    )}
                    {download.error && (
                      <p className="text-xs text-destructive">
                        {download.error}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
