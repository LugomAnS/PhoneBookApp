namespace Domain
{
    public class ContactPhoto
    {
        public Guid Id { get; set; }
        public string ContentType { get; set; }
        public byte[] Image { get; set; }
        public Contact Owner { get; set; }

    }
}
