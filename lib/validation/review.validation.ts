import { isValidSlug } from '../seo/indexability';
import { isValidEmail, sanitizePlainText } from '../utils/sanitize';

export type ReviewInput = {
  toolSlug?: string;
  authorName?: string;
  authorRole?: string;
  rating?: number;
  comment?: string;
  email?: string;
  status?: string;
  verifiedUser?: boolean;
};

export type ValidationError = { field: string; message: string };

const MAX_COMMENT_LENGTH = 2000;
const MIN_COMMENT_LENGTH = 10;
const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 254;

export function validateReviewInput(input: ReviewInput): ValidationError[] {
  const errors: ValidationError[] = [];

  if (input.status !== undefined) {
    errors.push({ field: 'status', message: 'Moderation status cannot be set by submitters' });
  }

  if (input.verifiedUser !== undefined) {
    errors.push({ field: 'verifiedUser', message: 'Verified flag cannot be set by submitters' });
  }

  if (!input.toolSlug?.trim()) {
    errors.push({ field: 'toolSlug', message: 'Tool slug is required' });
  } else if (!isValidSlug(input.toolSlug.trim())) {
    errors.push({ field: 'toolSlug', message: 'Invalid tool slug' });
  }

  if (input.authorName && input.authorName.trim().length > MAX_NAME_LENGTH) {
    errors.push({ field: 'authorName', message: `Display name max ${MAX_NAME_LENGTH} chars` });
  }

  if (input.authorRole && input.authorRole.trim().length > 100) {
    errors.push({ field: 'authorRole', message: 'Author role max 100 chars' });
  }

  const rating = Number(input.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    errors.push({ field: 'rating', message: 'Rating must be an integer between 1 and 5' });
  }

  const comment = input.comment?.trim() ?? '';
  if (!comment) {
    errors.push({ field: 'comment', message: 'Comment is required' });
  } else if (comment.length < MIN_COMMENT_LENGTH) {
    errors.push({ field: 'comment', message: `Comment must be at least ${MIN_COMMENT_LENGTH} characters` });
  } else if (comment.length > MAX_COMMENT_LENGTH) {
    errors.push({ field: 'comment', message: `Comment max ${MAX_COMMENT_LENGTH} chars` });
  }

  if (input.email?.trim()) {
    const email = input.email.trim();
    if (email.length > MAX_EMAIL_LENGTH || !isValidEmail(email)) {
      errors.push({ field: 'email', message: 'Invalid email address' });
    }
  }

  return errors;
}

export function normalizeReviewInput(input: ReviewInput) {
  return {
    toolSlug: input.toolSlug!.trim(),
    authorName: sanitizePlainText(input.authorName?.trim() || 'Anonymous', MAX_NAME_LENGTH),
    authorRole: sanitizePlainText(input.authorRole?.trim() || '', 100),
    rating: Number(input.rating),
    comment: sanitizePlainText(input.comment!.trim(), MAX_COMMENT_LENGTH),
    email: input.email?.trim() ? input.email.trim().toLowerCase() : undefined,
  };
}
