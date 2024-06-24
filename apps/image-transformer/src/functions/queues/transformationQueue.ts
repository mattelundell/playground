import { S3Event, SQSEvent } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';

export async function handler(event: SQSEvent) {
  const tasks = event.Records.map((record) => {
    const s3Event = JSON.parse(record.body) as S3Event;

    if (!s3Event.Records) {
      return;
    }

    //const s3Object = s3Event.Records.pop()!;

    // TODO: RM all images that begins with name;
    //return Image.Mutations.createDefaultTransformations(s3Object.s3.object.key);
    return {
      statusCode: StatusCodes.OK,
      body: JSON.stringify({}),
    };
  });

  await Promise.allSettled(tasks);
}
