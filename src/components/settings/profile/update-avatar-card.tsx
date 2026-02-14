import { FormError } from '@/components/layout/form-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { websiteConfig } from '@/config/website';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { IconUserCircle } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

interface UpdateAvatarCardProps {
  className?: string;
}

/**
 * Renders only when storage and enableUpdateAvatar are enabled.
 * Upload implementation can be added when storage API is available.
 */
export function UpdateAvatarCard({ className }: UpdateAvatarCardProps) {
  if (
    !websiteConfig.storage?.enable ||
    !websiteConfig.features?.enableUpdateAvatar
  ) {
    return null;
  }

  const [error, setError] = useState<string | undefined>('');
  const { data: session, refetch } = authClient.useSession();
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (session?.user?.image) setAvatarUrl(session.user.image);
  }, [session]);

  const user = session?.user;
  if (!user) return null;

  return (
    <Card className={cn('w-full overflow-hidden py-0 pt-6 flex flex-col', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Avatar</CardTitle>
        <CardDescription>Click upload button to upload a custom one</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        <div className="flex flex-col items-center sm:flex-row gap-4 sm:gap-8">
          <Avatar className="h-16 w-16 border">
            <AvatarImage src={avatarUrl ?? ''} alt={user.name ?? ''} />
            <AvatarFallback>
              <IconUserCircle className="h-8 w-8 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm" disabled className="cursor-pointer">
            Upload Avatar (storage not configured)
          </Button>
        </div>
        <FormError message={error} />
      </CardContent>
      <CardFooter className="mt-auto px-6 py-4 flex justify-between items-center bg-muted rounded-none">
        <p className="text-sm text-muted-foreground">
          An avatar is optional but strongly recommended
        </p>
      </CardFooter>
    </Card>
  );
}
