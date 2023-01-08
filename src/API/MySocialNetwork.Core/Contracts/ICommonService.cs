namespace MySocialNetwork.Core.Contracts
{
    using Microsoft.AspNetCore.Http;

    /// <summary>
    /// Common services
    /// </summary>
    public interface ICommonService
	{
        /// <summary>
        /// Uploads image to a cloud service
        /// </summary>
        /// <param name="imageFile">Uploaded image</param>
        /// <returns>Image URL</returns>
        Task<string> UploadImage(IFormFile imageFile);
    }
}