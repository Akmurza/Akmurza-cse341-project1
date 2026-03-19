module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'CSE 341 Contacts API',
    version: '1.0.0',
    description: 'API to manage contacts in MongoDB',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server',
    },
    {
      url: 'https://your-render-app.onrender.com',
      description: 'Render server',
    },
  ],
  paths: {
    '/contacts': {
      get: {
        summary: 'Get all contacts',
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      _id: { type: 'string' },
                      firstName: { type: 'string' },
                      lastName: { type: 'string' },
                      email: { type: 'string' },
                      favoriteColor: { type: 'string' },
                      birthday: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: 'Server error',
          },
        },
      },
      post: {
        summary: 'Create a contact',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
                properties: {
                  firstName: { type: 'string', example: 'John' },
                  lastName: { type: 'string', example: 'Doe' },
                  email: { type: 'string', example: 'john@example.com' },
                  favoriteColor: { type: 'string', example: 'Blue' },
                  birthday: { type: 'string', example: '1999-03-15' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Created',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      example: '65f5f7248d4fa343e4c98d7a',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request',
          },
          500: {
            description: 'Server error',
          },
        },
      },
    },
    '/contacts/{id}': {
      get: {
        summary: 'Get contact by id',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    _id: { type: 'string' },
                    firstName: { type: 'string' },
                    lastName: { type: 'string' },
                    email: { type: 'string' },
                    favoriteColor: { type: 'string' },
                    birthday: { type: 'string' },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request',
          },
          404: {
            description: 'Contact not found',
          },
          500: {
            description: 'Server error',
          },
        },
      },
      put: {
        summary: 'Update contact by id',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
                properties: {
                  firstName: { type: 'string', example: 'John' },
                  lastName: { type: 'string', example: 'Doe' },
                  email: { type: 'string', example: 'john@example.com' },
                  favoriteColor: { type: 'string', example: 'Blue' },
                  birthday: { type: 'string', example: '1999-03-15' },
                },
              },
            },
          },
        },
        responses: {
          204: {
            description: 'Updated',
          },
          400: {
            description: 'Bad request',
          },
          404: {
            description: 'Contact not found',
          },
          500: {
            description: 'Server error',
          },
        },
      },
      delete: {
        summary: 'Delete contact by id',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          204: {
            description: 'Deleted',
          },
          400: {
            description: 'Bad request',
          },
          404: {
            description: 'Contact not found',
          },
          500: {
            description: 'Server error',
          },
        },
      },
    },
  },
};
