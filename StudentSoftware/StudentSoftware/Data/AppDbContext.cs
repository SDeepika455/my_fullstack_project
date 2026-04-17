using Microsoft.EntityFrameworkCore;

using StudentSoftware.Models;

namespace StudentSoftware.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Student> Student { get; set; }
    }
}
