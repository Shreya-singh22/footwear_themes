import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: number;
}

const StarRating = ({ rating, onRatingChange, readonly = false, size = 20 }: StarRatingProps) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          className={`${readonly ? "cursor-default" : "cursor-pointer"} transition-transform hover:scale-110 active:scale-95`}
          onClick={() => onRatingChange?.(star)}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
        >
          <Star
            size={size}
            className={`${
              star <= (hover || rating)
                ? "fill-primary text-primary"
                : "text-muted-foreground fill-none"
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
