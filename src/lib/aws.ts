// import AWS from 'aws-sdk';

// // AWS設定
// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION || 'ap-northeast-1',
// });

// const s3 = new AWS.S3();

// export const uploadFileToS3 = async (
//   file: File,
//   key: string,
//   bucketName?: string
// ): Promise<string> => {
//   const bucket = bucketName || process.env.AWS_S3_BUCKET_NAME;
  
//   if (!bucket) {
//     throw new Error('S3 bucket name is not configured');
//   }

//   const params = {
//     Bucket: bucket,
//     Key: key,
//     Body: file,
//     ContentType: file.type,
//     ACL: 'public-read' as const,
//   };

//   try {
//     const result = await s3.upload(params).promise();
//     return result.Location;
//   } catch (error) {
//     console.error('S3 upload error:', error);
//     throw new Error(`Failed to upload file to S3: ${error}`);
//   }
// };

// export const deleteFileFromS3 = async (
//   key: string,
//   bucketName?: string
// ): Promise<void> => {
//   const bucket = bucketName || process.env.AWS_S3_BUCKET_NAME;
  
//   if (!bucket) {
//     throw new Error('S3 bucket name is not configured');
//   }

//   const params = {
//     Bucket: bucket,
//     Key: key,
//   };

//   try {
//     await s3.deleteObject(params).promise();
//   } catch (error) {
//     console.error('S3 delete error:', error);
//     throw new Error(`Failed to delete file from S3: ${error}`);
//   }
// };

// export const generateSignedUrl = async (
//   key: string,
//   expires: number = 3600,
//   bucketName?: string
// ): Promise<string> => {
//   const bucket = bucketName || process.env.AWS_S3_BUCKET_NAME;
  
//   if (!bucket) {
//     throw new Error('S3 bucket name is not configured');
//   }

//   const params = {
//     Bucket: bucket,
//     Key: key,
//     Expires: expires,
//   };

//   try {
//     return await s3.getSignedUrlPromise('getObject', params);
//   } catch (error) {
//     console.error('S3 signed URL error:', error);
//     throw new Error(`Failed to generate signed URL: ${error}`);
//   }
// };

// // ファイル名を安全な形式に変換
// export const sanitizeFileName = (fileName: string): string => {
//   return fileName
//     .replace(/[^a-zA-Z0-9.-]/g, '_')
//     .replace(/_+/g, '_')
//     .toLowerCase();
// };

// // ファイルキーを生成（重複を避けるためにタイムスタンプを含む）
// export const generateFileKey = (
//   folder: string,
//   fileName: string,
//   prefix?: string
// ): string => {
//   const timestamp = Date.now();
//   const sanitizedName = sanitizeFileName(fileName);
//   const prefixPart = prefix ? `${prefix}_` : '';
  
//   return `${folder}/${prefixPart}${timestamp}_${sanitizedName}`;
// };

// export default s3;
