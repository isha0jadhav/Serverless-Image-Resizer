import boto3
import os
from PIL import Image
import tempfile

s3 = boto3.client("s3")

DEST_BUCKET = "serverless-resized-images"

def lambda_handler(event, context):

    for record in event["Records"]:

        source_bucket = record["s3"]["bucket"]["name"]
        key = record["s3"]["object"]["key"]

        download_path = os.path.join(tempfile.gettempdir(), key)

        resized_filename = "resized-" + os.path.basename(key)

        upload_path = os.path.join(
            tempfile.gettempdir(),
            resized_filename
        )

        # Download original image
        s3.download_file(source_bucket, key, download_path)

        image = Image.open(download_path)

        # Convert to RGB if required
        if image.mode in ("RGBA", "P"):
            image = image.convert("RGB")

        # Keep aspect ratio
        image.thumbnail((600, 600))

        # Save optimized image
        image.save(
            upload_path,
            format="JPEG",
            quality=70,
            optimize=True
        )

        # Upload resized image
        s3.upload_file(
            upload_path,
            DEST_BUCKET,
            resized_filename,
            ExtraArgs={
                "ContentType": "image/jpeg"
            }
        )

    return {
        "statusCode": 200,
        "body": "Image resized successfully"
    }