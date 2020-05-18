import express from 'express';
import auth from '../../middleware/auth/jwt.auth';
import valid from './valid/post.schema';
import postController from './post.controller';
import userController from '../user/user.controller';

const router = express.Router();

/**
 * @swagger
 * definitions:
 *  boardItem:
 *   type: object
 *   required:
 *     - boardTitle
 *     - boardContent
 *     - boardState
 *     - boardType
 *   properties:
 *     id:
 *       type: integer
 *       description: ObjectId
 *     boardTitle:
 *       type: string
 *       description: 게시글 제목
 *     boardContent:
 *       type: string
 *       description: 게시글 내용
 *     boardState:
 *       type: boolean
 *       description: 게시글 숨김상태여부
 *     boardType:
 *       type: string
 *       description: 게시글 타입
 */

/**
 * @swagger
 *  /boards:
 *    get:
 *      tags:
 *      - board
 *      description: 모든 게시글을 가져온다.
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      responses:
 *       200:
 *        description: board of column list
 *        schema:
 *          type: array
 *          items:
 *           $ref: '#/definitions/boardItem'
 */
router.get('/', postController.findAll);

router.get('/:id', valid.getOneSchema, postController.findOne);

router.post('/', auth.verification, valid.postSchema, postController.savePost);

router.put(
  '/:id',
  auth.verification,
  valid.updateSchema,
  postController.updatePost
);

// TODO: 삭제 시 비밀번호 체크 추가
router.delete(
  '/:id',
  auth.verification,
  valid.getOneSchema,
  userController.validPassword,
  postController.deletePost
);

module.exports = router;
