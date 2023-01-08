namespace MySocialNetwork.Core.Services
{
    using CloudinaryDotNet;
    using CloudinaryDotNet.Actions;
    using Microsoft.AspNetCore.Http;
    using MySocialNetwork.Core.Contracts;

    /// <summary>
    /// Common services
    /// </summary>
    public class CommonService : ICommonService
    {
        private readonly Cloudinary cloudinary;

        public CommonService(Cloudinary _cloudinary)
        {
            cloudinary = _cloudinary;
        }

        /// <summary>
        /// Uploads image to a cloud service
        /// </summary>
        /// <param name="imageFile">Uploaded image</param>
        /// <returns>Image URL</returns>
        public async Task<string> UploadImage(IFormFile imageFile)
        {
            if (imageFile == null)
            {
                return null;
            }

            using var stream = imageFile.OpenReadStream();

            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(imageFile.FileName, stream)
            };

            var result = await cloudinary.UploadAsync(uploadParams);

            var imageUrl = result.Url.ToString();

            return imageUrl;
        }
    }
}