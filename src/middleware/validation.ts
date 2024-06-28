import { body, param } from 'express-validator';

export const validatePost = [
    body('title')
        .isString()
        .withMessage('Title must be a string')
        .isLength({ min: 1 })
        .withMessage('Title is required'),
    body('content')
        .isString()
        .withMessage('Content must be a string')
        .isLength({ min: 1 })
        .withMessage('Content is required'),
];

export const validatePostId = [
    param('id')
        .isInt({ gt: 0 })
        .withMessage('ID must be a positive integer'),
];
