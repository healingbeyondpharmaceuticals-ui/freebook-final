import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { MessageCircle, Share2, MoreHorizontal, Flag, Megaphone } from 'lucide-react';
import { ReactionBar } from './ReactionButton';

interface Post {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  image?: string;
  avatar?: string;
  reactions?: Record<string, number>;
  userReactions?: Record<string, boolean>;
  comments?: number;
  shares?: number;
}

interface PostCardProps {
  post: Post;
  currentUser?: string;
  onReaction?: (postId: string, reactionType: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onReport?: (postId: string) => void;
  onAdvertise?: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = React.memo(({ 
  post, 
  currentUser,
  onReaction,
  onComment,
  onShare,
  onReport,
  onAdvertise
}) => {
  const [showComments, setShowComments] = useState(false);

  const handleReaction = useCallback((reactionType: string) => {
    onReaction?.(post.id, reactionType);
  }, [post.id, onReaction]);

  const handleComment = useCallback(() => {
    setShowComments(!showComments);
    onComment?.(post.id);
  }, [post.id, onComment, showComments]);

  return (
    <Card className="w-full mb-4 hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center gap-3 pb-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={post.avatar} alt={post.author} />
          <AvatarFallback>{post.author.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold text-sm">{post.author}</h3>
          <p className="text-xs text-gray-500">{post.timestamp}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => onReport?.(post.id)}>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-gray-800 leading-relaxed mb-3">{post.content}</p>
        {post.image && (
          <img 
            src={post.image} 
            alt="Post content" 
            className="w-full rounded-lg max-h-96 object-cover"
          />
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-3 pt-0">
        <ReactionBar
          reactions={post.reactions || {}}
          userReactions={post.userReactions || {}}
          onReaction={handleReaction}
        />
        
        <div className="flex items-center justify-between w-full text-gray-500">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleComment}
            className="flex items-center gap-2 hover:text-blue-600"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments || 0} Comments</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onShare?.(post.id)}
            className="flex items-center gap-2 hover:text-green-600"
          >
            <Share2 className="w-4 h-4" />
            <span>{post.shares || 0} Shares</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onReport?.(post.id)}
            className="flex items-center gap-1 hover:text-red-600 text-xs opacity-50"
          >
            <Flag className="w-3 h-3" />
          </Button>
        </div>
        
        {/* Advertise This button - only visible to post author */}
        {currentUser && currentUser === post.author && (
          <div className="w-full pt-2 border-t border-gray-100">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAdvertise?.(post.id)}
              className="w-full flex items-center gap-2 bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300 hover:text-red-800"
            >
              <Megaphone className="w-4 h-4" />
              <span>Advertise This Post</span>
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
});

PostCard.displayName = 'PostCard';