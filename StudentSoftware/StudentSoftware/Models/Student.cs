namespace StudentSoftware.Models
{
    public class Student
    {
        public int id { get; set; }
        public string? name { get; set; }
        public string? email { get; set; }
        public string? phone { get; set; }
        public string? city { get; set; }
        public string? state { get; set; }
        public string? gender { get; set; }
        public bool isActive { get; set; } = true;


    }
}
