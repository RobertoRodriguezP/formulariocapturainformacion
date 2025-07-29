using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VehicleAppointmentsApi.Data;
using VehicleAppointmentsApi.Models;

namespace VehicleAppointmentsApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AppointmentsController : ControllerBase
{
    private readonly AppDbContext _context;

    public AppointmentsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("{plate}")]
    public async Task<IActionResult> GetAppointments(string plate)
    {
        var appointments = await _context.Appointments
            .Where(a => a.Plate.ToUpper() == plate.ToUpper())
            .OrderBy(a => a.Date)
            .ToListAsync();

        if (!appointments.Any())
            return Ok(new { message = "No tiene citas" });

        return Ok(appointments);
    }

    [HttpPost]
public async Task<IActionResult> CreateAppointment([FromBody] Appointment appointment)
{
    var date = appointment.Date;

    // Validar que sea futura
    if (date <= DateTime.Now)
        return BadRequest("La fecha debe ser en el futuro.");

    // Validar intervalo de 30 minutos
    if (date.Minute != 0 && date.Minute != 30)
        return BadRequest("Solo se permiten intervalos de 30 minutos.");

    // Validar horario entre 8:00 AM y 4:30 PM
    var hour = date.Hour;
    var minute = date.Minute;
    if (hour < 8 || hour > 16 || (hour == 16 && minute > 30))
        return BadRequest("La cita debe ser entre 8:00 AM y 4:30 PM.");

    appointment.Status = "PROGRAMADA";
    _context.Appointments.Add(appointment);
    await _context.SaveChangesAsync();

    return Ok(appointment);
}
[HttpGet]
public async Task<IActionResult> GetAllAppointments()
{
    var all = await _context.Appointments
        .OrderByDescending(a => a.Date)
        .ToListAsync();

    return Ok(all);
}


}
