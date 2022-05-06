import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router()


routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body; 

  const prismaFeedbackRepository = new PrismaFeedbackRepository()
  const nodemailerMailAdapter = new NodemailerMailAdapter
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    nodemailerMailAdapter
    ) 

    await submitFeedbackUseCase.execute({
      type,
      comment,
      screenshot,
    })

  // await transport.sendMail({
  //   from: 'Equipe Feedget <oi@feedget.com',
  //   to: 'Leandro Vieira <leandrorvieira@yahoo.com>',
  //   subject: 'Novo feedback',
  //   html: [
  //     `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
  //     `<p>Tipo do feedback:${type}</p>`,
  //     `<p>Comentário: ${comment}</p>`,
  //     `</div>`
  //   ].join('\n')
  // });

  return res.status(201).send();
});