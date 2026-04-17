using Microsoft.AspNetCore.Mvc;
using StudentSoftware.Data;
using StudentSoftware.Models;

namespace StudentSoftware.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : Controller
    {
        private readonly AppDbContext _appDbContext;
        public StudentController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        [HttpGet]
        [Route("getStudent")]
        public IActionResult GetStudent()
        {
            var students = _appDbContext.Student
                .Where(s=>s.isActive).ToList();
            return Ok(students);
        }

        [HttpPost]
        [Route("add")]
        public IActionResult AddStudent(Student student)
        {
            _appDbContext.Student.Add(student);
            _appDbContext.SaveChanges();
            return Ok();
        }
        [HttpPut]
        [Route("update/{id}")]
        public IActionResult editStudent(int id,Student student)
        {
            if(student==null || id != student.id)
            {
                return BadRequest("invalid data");
            }
            var s_id = _appDbContext.Student.Find(id);
            if (s_id == null)
            {
                return NotFound();
            }

            s_id.name= student.name;
            s_id.email = student.email;
            s_id.phone= student.phone;
            s_id.city = student.city;
            s_id.state=student.state;
            s_id.gender = student.gender;
            _appDbContext.SaveChanges();
            return Ok();
        }

        [HttpPut]
        [Route("delete/{id}")]
        public IActionResult deleteStudent(int id)
        {
            var student = _appDbContext.Student.Find(id);
            if (student==null)
            {
                return BadRequest("No id is there");
            }
            student.isActive = false;
            //_appDbContext.Student.Remove(student);
            _appDbContext.SaveChanges();
            return Ok();
        }
    }
}
