import { randomUUID } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { fileURLToPath } from 'node:url'
import { type Plugin } from 'vite'

type Expense = {
  id: string
  description: string
  amount: number
  category: string
  date: string
}

const dataFile = fileURLToPath(new URL('./mock-data.json', import.meta.url))
const expensePath = '/api/expenses'

function respond(response: ServerResponse, status: number, body: unknown) {
  response.statusCode = status
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.end(JSON.stringify(body))
}

async function readExpenses(): Promise<Expense[]> {
  const contents = await readFile(dataFile, 'utf8')
  const data: unknown = JSON.parse(contents)
  if (!Array.isArray(data)) throw new Error('mock-data.json must contain an array.')
  return data as Expense[]
}

async function readRequestBody(request: IncomingMessage) {
  const chunks: Buffer[] = []
  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown
}

export default function mockApi(): Plugin {
  return {
    name: 'local-expenses-mock-api',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const pathname = new URL(request.url ?? '/', 'http://localhost').pathname
        const itemMatch = pathname.match(/^\/api\/expenses\/([^/]+)$/)
        if (pathname !== expensePath && !itemMatch) {
          next()
          return
        }

        try {
          if (request.method === 'GET' && pathname === expensePath) {
            respond(response, 200, await readExpenses())
            return
          }

          if (request.method === 'POST' && pathname === expensePath) {
            const body = await readRequestBody(request)
            if (
              typeof body !== 'object' ||
              body === null ||
              !('description' in body) ||
              typeof body.description !== 'string' ||
              !body.description.trim() ||
              !('amount' in body) ||
              !Number.isFinite(Number(body.amount)) ||
              Number(body.amount) <= 0 ||
              !('category' in body) ||
              typeof body.category !== 'string' ||
              !('date' in body) ||
              typeof body.date !== 'string' ||
              !body.date
            ) {
              respond(response, 400, { message: 'Invalid expense. Provide description, positive amount, category and date.' })
              return
            }

            const expenses = await readExpenses()
            const created: Expense = {
              id: randomUUID(),
              description: body.description.trim(),
              amount: Number(body.amount),
              category: body.category,
              date: body.date,
            }
            await writeFile(dataFile, `${JSON.stringify([created, ...expenses], null, 2)}\n`)
            respond(response, 201, created)
            return
          }

          if (request.method === 'DELETE' && itemMatch) {
            const id = decodeURIComponent(itemMatch[1])
            const expenses = await readExpenses()
            const remaining = expenses.filter((expense) => expense.id !== id)
            if (remaining.length === expenses.length) {
              respond(response, 404, { message: 'Expense not found.' })
              return
            }
            await writeFile(dataFile, `${JSON.stringify(remaining, null, 2)}\n`)
            respond(response, 200, { id })
            return
          }

          respond(response, 405, { message: 'Method not allowed.' })
        } catch (error) {
          if (error instanceof SyntaxError) {
            respond(response, 400, { message: 'Request body must be valid JSON.' })
            return
          }
          const message = error instanceof Error ? error.message : 'Local mock API request failed.'
          respond(response, 500, { message })
        }
      })
    },
  }
}
