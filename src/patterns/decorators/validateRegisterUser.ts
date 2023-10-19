import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError, z } from 'zod';

const cpfWithoutSymbols = /^[^.\\-]*$/;

const registerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  cpf: z.string().regex(cpfWithoutSymbols).max(11),
});

export function validateRegisterUser(
  _target: unknown,
  _propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    try {
      registerBodySchema.parse(request.body);
      await originalMethod.call(this, request, reply);
    } catch (error) {
      if (error instanceof ZodError) {
        reply.status(400).send({
          message: 'Dados de solicitação inválidos',
          errors: error.message,
        });
      }
    }
  };
}
