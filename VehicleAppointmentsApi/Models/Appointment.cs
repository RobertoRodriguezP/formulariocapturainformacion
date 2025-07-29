using System.ComponentModel.DataAnnotations;

namespace VehicleAppointmentsApi.Models
{
    public class Appointment
    {
        public int Id { get; set; }

        [Required]
        public string Plate { get; set; } = string.Empty;

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string Status { get; set; } = "PROGRAMADA";
    }
}
