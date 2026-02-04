import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Eye, Code, ExternalLink, CheckCircle, Info } from "lucide-react";
import { getPageSeo, PageSeoData } from "@/config/seoConfig";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface PageEditorProps {
  page: {
    title: string;
    path: string;
    description: string;
  };
  onClose: () => void;
}

export function PageEditor({ page, onClose }: PageEditorProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("seo");
  const [seoData, setSeoData] = useState<PageSeoData | null>(null);
  const { toast } = useToast();

  // Load actual SEO data from config
  useEffect(() => {
    const loadSeoData = () => {
      setIsLoading(true);
      
      // Get the actual SEO data from our centralized config
      const configSeo = getPageSeo(page.path);
      
      if (configSeo) {
        setSeoData(configSeo);
      } else {
        // Fallback for pages not in config
        setSeoData({
          path: page.path,
          title: page.title,
          seoTitle: page.title,
          description: page.description,
          keywords: [],
          canonical: page.path
        });
      }
      
      setIsLoading(false);
    };
    
    loadSeoData();
  }, [page]);

  const handlePreview = () => {
    window.open(page.path, "_blank");
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading SEO data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border rounded-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <CardTitle>SEO Details: {page.title}</CardTitle>
            <Badge variant="default" className="bg-green-600">
              <CheckCircle className="h-3 w-3 mr-1" />
              SEO Active
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Path: {page.path}
        </p>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4">
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Read-Only View</AlertTitle>
          <AlertDescription>
            This shows the actual SEO metadata configured in the page's React component. 
            To modify SEO, update the &lt;SEO /&gt; component in the page's source file.
          </AlertDescription>
        </Alert>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="seo" className="flex items-center">
              <Code className="h-4 w-4 mr-2" />
              SEO Metadata
            </TabsTrigger>
            <TabsTrigger value="technical" className="flex items-center">
              <Code className="h-4 w-4 mr-2" />
              Technical Details
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="seo" className="space-y-4">
            {seoData && (
              <div className="space-y-6">
                {/* Meta Title */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Meta Title</Label>
                  <div className="p-3 bg-muted rounded-md border">
                    <p className="font-medium">{seoData.seoTitle}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {seoData.seoTitle.length} characters 
                      {seoData.seoTitle.length > 60 ? " (slightly long)" : " (optimal)"}
                    </p>
                  </div>
                </div>

                {/* Meta Description */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Meta Description</Label>
                  <div className="p-3 bg-muted rounded-md border">
                    <p>{seoData.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {seoData.description.length} characters 
                      {seoData.description.length > 160 ? " (slightly long)" : " (optimal)"}
                    </p>
                  </div>
                </div>

                {/* Keywords */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Keywords</Label>
                  <div className="p-3 bg-muted rounded-md border">
                    {seoData.keywords.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {seoData.keywords.map((keyword, index) => (
                          <Badge key={index} variant="secondary">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">No keywords specified</p>
                    )}
                  </div>
                </div>

                {/* Canonical URL */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Canonical URL</Label>
                  <div className="p-3 bg-muted rounded-md border">
                    <code className="text-sm">https://gaapio.com{seoData.canonical}</code>
                  </div>
                </div>

                {/* Indexing Status */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Search Engine Indexing</Label>
                  <div className="p-3 bg-muted rounded-md border">
                    {seoData.noindex ? (
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-amber-600 border-amber-600">
                          noindex
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          This page is hidden from search engines
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Badge variant="default" className="bg-green-600">
                          Indexed
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          This page is visible to search engines
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Structured Data */}
                {seoData.structuredData && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Structured Data (JSON-LD)</Label>
                    <div className="p-3 bg-muted rounded-md border">
                      <Badge variant="secondary">{seoData.structuredData}</Badge>
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="technical" className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Page Path</Label>
                  <div className="p-3 bg-muted rounded-md border">
                    <code className="text-sm">{page.path}</code>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Display Title</Label>
                  <div className="p-3 bg-muted rounded-md border">
                    <p className="text-sm">{page.title}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">SEO Implementation</Label>
                <div className="p-3 bg-muted rounded-md border space-y-2">
                  <p className="text-sm">
                    <strong>Component:</strong> <code>&lt;SEO /&gt;</code> from <code>@/components/SEO.tsx</code>
                  </p>
                  <p className="text-sm">
                    <strong>Method:</strong> react-helmet-async (client-side meta injection)
                  </p>
                  <p className="text-sm">
                    <strong>Open Graph:</strong> Enabled (Facebook, LinkedIn)
                  </p>
                  <p className="text-sm">
                    <strong>Twitter Cards:</strong> summary_large_image
                  </p>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>How SEO Works</AlertTitle>
                <AlertDescription className="text-sm">
                  Each page imports the <code>&lt;SEO /&gt;</code> component and passes props for title, 
                  description, keywords, etc. The component uses react-helmet-async to inject 
                  meta tags into the HTML <code>&lt;head&gt;</code> at runtime. Search engines 
                  can read these tags when crawling the page.
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4 bg-muted/50">
        <Button variant="outline" onClick={onClose}>
          Back to Pages
        </Button>
        <Button onClick={handlePreview}>
          <Eye className="h-4 w-4 mr-2" />
          View Live Page
          <ExternalLink className="h-3 w-3 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
