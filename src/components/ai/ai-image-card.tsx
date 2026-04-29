import { useState } from 'react';
import { IconLoader2, IconPhoto } from '@tabler/icons-react';
import { generateAiImage } from '@/api/ai';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const SAMPLE_PROMPT =
  'A cute red panda wearing a tiny astronaut helmet floating among nebulas, cinematic lighting, ultra detailed';

export function AiImageCard() {
  const [prompt, setPrompt] = useState(SAMPLE_PROMPT);
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isPending, setIsPending] = useState(false);

  async function onGenerate() {
    setError(undefined);
    setImageUrl(undefined);
    setIsPending(true);
    try {
      const result = await generateAiImage({ data: { prompt } });
      setImageUrl(result.imageUrl);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to generate image.'
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconPhoto className="size-5 text-primary" />
          Image Generation
        </CardTitle>
        <CardDescription>
          Powered by fal.ai{' '}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            fal-ai/flux/schnell
          </code>{' '}
          via the TanStack AI fal adapter.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="ai-image-prompt">Prompt</Label>
            <Textarea
              id="ai-image-prompt"
              rows={6}
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Describe the image you want to generate..."
            />
            <p className="text-xs text-muted-foreground">
              {prompt.length} characters
            </p>
            <Button
              type="button"
              onClick={onGenerate}
              disabled={isPending || prompt.trim().length < 3}
            >
              {isPending ? (
                <>
                  <IconLoader2 className="mr-1 size-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Image'
              )}
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Result</Label>
            <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-md border bg-muted/30">
              {error ? (
                <span className="px-4 text-center text-sm text-destructive">
                  {error}
                </span>
              ) : isPending ? (
                <IconLoader2 className="size-8 animate-spin text-muted-foreground" />
              ) : imageUrl ? (
                <img
                  src={imageUrl}
                  alt="AI generated"
                  className="size-full object-cover"
                />
              ) : (
                <span className="px-4 text-center text-sm text-muted-foreground">
                  Your generated image will appear here.
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
