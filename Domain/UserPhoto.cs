using System.Reflection.Metadata;

namespace Domain
{
    public class UserPhoto
    {
        public Guid Id { get; set; }
        public string ContentType { get; set; }
        public byte[] Image { get; set; }
        public AppUser Owner { get; set; }

    }
}
