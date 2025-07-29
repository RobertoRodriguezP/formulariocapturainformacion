using Microsoft.EntityFrameworkCore;
using VehicleAppointmentsApi.Models;

namespace VehicleAppointmentsApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Appointment> Appointments => Set<Appointment>();
    }
}
