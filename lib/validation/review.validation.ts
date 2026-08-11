import { isValidSlug } from '../seo/indexability';

export type ReviewInput = {
  toolSlug?: string;
  authorName?: string;
  authorRole?: string;
  rating?: number;
  comment?: string;
};

export type ValidationError = { field: string; message: string };

const MAX_COMMENT_LENGTH = 2000;
const MAX_NAME_LENGTH = 100;

export function validateReviewInput(input: ReviewInput): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!input.toolSlug?.trim()) {
    errors.push({ field: 'toolSlug', message: 'Tool slug is required' });
  } else if (!isValidSlug(input.toolSlug.trim())) {
    errors.push({ field: 'toolSlug', message: 'Invalid tool slug' });
  }

  if (!input.authorName?.trim()) {
    errors.push({ field: 'authorName', message: 'Author name is required' });
  } else if (input.authorName.trim().length > MAX_NAME_LENGTH) {
    errors.push({ field: 'authorName', message: `Author name max ${MAX_NAME_LENGTH} chars` });
  }

  if (!input.authorRole?.trim()) {
    errors.push({ field: 'authorRole', message: 'Author role is required' });
  }

  const rating = Number(input.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    errors.push({ field: 'rating', message: 'Rating must be an integer between 1 and 5' });
  }

  if (!input.comment?.trim()) {
    errors.push({ field: 'comment', message: 'Comment is required' });
  } else if (input.comment.trim().length < 10) {
    errors.push({ field: 'comment', message: 'Comment must be at least 10 characters' });
  } else if (input.comment.trim().length > MAX_COMMENT_LENGTH) {
    errors.push({ field: 'comment', message: `Comment max ${MAX_COMMENT_LENGTH} chars` });
  }

  return errors;
}
